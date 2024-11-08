
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CreateUser from "./CreateUser"
import CreateAdmin from "./CreateAdmin"

const CreateAccount =  () => {
      

  return (
    <div className="flex h-screen mx-auto items-center justify-center align-middle bg-secondary">
      <Tabs defaultValue="user" className="w-1/3 ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="user">

        <CreateUser/>
        
        </TabsContent>
        <TabsContent value="admin">
          {/* <Card>
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>
                Login admin account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="adminemail">Email</Label>
                <Input id="adminemail" placeholder="johndoe@email.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="passwordadmin">Password</Label>
                <Input id="passwordadmin" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="text-white">Login</Button>
            </CardFooter>
          </Card> */}
          <CreateAdmin/>
        </TabsContent>
      </Tabs>

    </div>
  )
}
export default CreateAccount;
