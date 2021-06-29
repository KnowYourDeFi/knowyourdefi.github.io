import React from "react"
import { useTable, usePagination } from "react-table"
import styled from 'styled-components'

const Style = styled.div`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  overflow-x: scroll;
`

export default function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state: { pageIndex }
    } = useTable(
      {
        columns,
        data,
        initialState: { pageSize: 10 }
      },
      usePagination
    );

    // Render the UI for your table
    return (
      <>
      <Style>
        <table
          {...getTableProps()}
        //   border={1}
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            {headerGroups.map((group) => (
              <tr {...group.getHeaderGroupProps()}>
                {group.headers.map((column) => (
                  <th
                  {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  <span>{column.render('Header')}</span>
                </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps({
                        style: { minWidth: cell.column.minWidth, width: cell.column.width },
                      })}>
                          {cell.render("Cell")}
                     </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        </Style>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            {pageIndex + 1} of {pageCount}
          </span>
        </div>
      </>
    );
  }
