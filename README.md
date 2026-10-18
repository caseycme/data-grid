# data-grid

A more flexible data grid for SaaS products who want the flexibility of a custom build but the support of a pre built solution.

This first slice is a headless grid. It renders a table and nothing else. The Storybook example is a separate styled skin.

## Structure

`DataGrid.Root` holds the columns and rows. `DataGrid.Header` and `DataGrid.Body` read that context and render the table. There is no CSS in `src`.

```tsx
<DataGrid.Root columns={columns} rows={rows}>
  <DataGrid.Header />
  <DataGrid.Body />
</DataGrid.Root>
```

A column is an id, a header, and a cell function:

```tsx
{ id: "name", header: "Name", cell: (row) => row.name }
```

Styles for the example live in `stories/data-grid.css` and apply only when the table has `className="dg"`.

## Run

```bash
npm install
npm run storybook
```
