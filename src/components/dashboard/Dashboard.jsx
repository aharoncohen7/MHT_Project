import UsersTable from "./UsersTable";


export default function Dashboard() {
   return (
      <div>
         <header className="pt-6 text-center">
            {/* <h1 className="text-xl font-bold font-mono">Users table</h1> */}
         </header>
         <main className="">
            <UsersTable />
         </main>
      </div>
   )
}
