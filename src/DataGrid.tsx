import {
  createContext,
  useContext,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from "react";

export type DataGridColumn<Row> = {
  id: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
};

type GridContextValue<Row> = {
  columns: DataGridColumn<Row>[];
  rows: Row[];
  getRowId: (row: Row, index: number) => string;
};

const GridContext = createContext<GridContextValue<unknown> | null>(null);

function useGrid<Row>() {
  const value = useContext(GridContext);
  if (!value) {
    throw new Error("DataGrid.Header and DataGrid.Body must render inside DataGrid.Root");
  }
  return value as GridContextValue<Row>;
}

type RootProps<Row> = ComponentProps<"table"> & {
  columns: DataGridColumn<Row>[];
  rows: Row[];
  getRowId?: (row: Row, index: number) => string;
};

function Root<Row>({
  columns,
  rows,
  getRowId = (_row, index) => String(index),
  children,
  ...props
}: RootProps<Row>) {
  const value = useMemo(
    () => ({ columns, rows, getRowId }),
    [columns, rows, getRowId],
  );

  return (
    <GridContext.Provider value={value as GridContextValue<unknown>}>
      <table {...props} data-grid="">
        {children}
      </table>
    </GridContext.Provider>
  );
}

function Header(props: ComponentProps<"thead">) {
  const { columns } = useGrid();

  return (
    <thead {...props} data-part="header">
      <tr data-part="header-row">
        {columns.map((column) => (
          <th
            key={column.id}
            scope="col"
            data-part="column-header"
            data-column={column.id}
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body(props: ComponentProps<"tbody">) {
  const { columns, rows, getRowId } = useGrid();

  return (
    <tbody {...props} data-part="body">
      {rows.map((row, index) => (
        <tr key={getRowId(row, index)} data-part="row">
          {columns.map((column) => (
            <td key={column.id} data-part="cell" data-column={column.id}>
              {column.cell(row)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export const DataGrid = {
  Root,
  Header,
  Body,
};
