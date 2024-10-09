import UserTable from "./UserTable";


export default function Dashboard() {
   return (
      <div>
         <header className="pt-6 text-center">
            {/* <h1 className="text-xl font-bold font-mono">רשימת המשתמשים הרשומים</h1> */}
         </header>
         <main className="">
            <UserTable />
         </main>
      </div>
   )
}
