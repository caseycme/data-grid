import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGrid, type DataGridColumn } from "../src";
import "./data-grid.css";

type Person = {
  name: string;
  role: string;
  team: string;
};

const columns: DataGridColumn<Person>[] = [
  { id: "name", header: "Name", cell: (row) => row.name },
  { id: "role", header: "Role", cell: (row) => row.role },
  { id: "team", header: "Team", cell: (row) => row.team },
];

const rows: Person[] = [
  { name: "Ava Chen", role: "Engineer", team: "Platform" },
  { name: "Noah Patel", role: "Designer", team: "Product" },
  { name: "Mia Rossi", role: "Engineer", team: "Billing" },
  { name: "Leo Kim", role: "Support", team: "Success" },
];

const meta = {
  title: "Data Grid",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Styled: Story = {
  render: () => (
    <DataGrid.Root className="dg" columns={columns} rows={rows}>
      <DataGrid.Header />
      <DataGrid.Body />
    </DataGrid.Root>
  ),
};
