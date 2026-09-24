/*
 * 文件说明: 验证外部数据请求失败时页面仍可浏览，持有人组件不会导致白屏。
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { liquityClient, uniV2Client, uniV3Client, blockClient, ensClient } from './liquity/LiquityData';
import { hoprClient, hoprXdaiClient } from './hopr/HoprData';
import axios from 'axios';
import App from './App';
import LusdHolders from './liquity/charts/LusdHolders';
import { HoprHolders, HoprXdaiHolders } from './hopr/charts/Holders';
import DataBoundary from './widget/DataBoundary';
import LqtyCirculatingSupply from './liquity/charts/LqtyCirculatingSupply';

jest.mock('echarts-for-react', () => () => null);
jest.mock('axios');

let queryMock;
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  queryMock = jest.fn().mockRejectedValue(new Error('Service unavailable'));
  [liquityClient, uniV2Client, uniV3Client, blockClient, ensClient, hoprClient, hoprXdaiClient].forEach(client => {
    jest.spyOn(client, 'query').mockImplementation(options => queryMock(options));
  });
  axios.get.mockRejectedValue(new Error('Service unavailable'));
});
afterEach(() => jest.restoreAllMocks());

test.each([LusdHolders, HoprHolders, HoprXdaiHolders])('failed holders query shows No data without removing siblings', async (Component) => {
  render(<><span>Other content</span><Component /></>);
  expect(await screen.findByText('No data')).toBeInTheDocument();
  expect(screen.getByText('Other content')).toBeInTheDocument();
});

test('successful empty holders query still displays the real count of zero', async () => {
  queryMock.mockResolvedValue({ data: { tokenBalances: [] } });
  render(<LusdHolders />);
  expect(await screen.findByText('0')).toBeInTheDocument();
});

test('Azure network or CORS failure shows No data', async () => {
  render(<LqtyCirculatingSupply />);
  expect(await screen.findByText('No data')).toBeInTheDocument();
});

test('a broken data renderer does not remove neighboring cards', () => {
  function BrokenData() { throw new Error('Malformed response'); }
  render(<><DataBoundary><BrokenData /></DataBoundary><DataBoundary><span>Healthy chart</span></DataBoundary></>);
  expect(screen.getByText('No data')).toBeInTheDocument();
  expect(screen.getByText('Healthy chart')).toBeInTheDocument();
});

test('page navigation and card headings survive when all data services fail', async () => {
  render(<App />);
  await waitFor(() => expect(screen.queryAllByText('Loading...')).toHaveLength(0));
  expect(screen.getByRole('link', { name: 'Connect' })).toBeInTheDocument();
  expect(screen.getByText('Total Value Locked')).toBeInTheDocument();
  expect(screen.getAllByText('No data').length).toBeGreaterThan(0);
});
