import UserTable from "./UserTable";


export default function Dashboard() {
   return (
      <div>
         <header className="p-4 text-center">
            <h1 className="text-xl font-bold font-mono">Users Table</h1>
         </header>
         <main className="p-4">
            <UserTable />
         </main>
      </div>
   )
}
