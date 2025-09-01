// resources/js/Pages/Konfigurasi/Roles.jsx
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function RolesPage({ roles = [], permissions = [] }) {
  const { data, setData, post, processing } = useForm({
    permissions: [],
  });

  const handleSubmit = (roleId) => {
    post(route("roles.updatePermissions", roleId), {
      onSuccess: () => {
        console.log("Permissions updated!");
      },
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Judul Halaman */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Manajemen Role</h1>
          <span className="text-sm text-gray-500">
            Total Role: {roles.length}
          </span>
        </div>

        {roles.length > 0 ? (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Kelola Permissions per Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={roles[0]?.id?.toString()}>
                {/* Tab daftar role */}
                <TabsList className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <TabsTrigger
                      key={role.id}
                      value={role.id.toString()}
                    >
                      {role.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Isi tab per role */}
                {roles.map((role) => (
                  <TabsContent
                    key={role.id}
                    value={role.id.toString()}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {permissions.map((perm) => (
                        <label
                          key={perm.id}
                          className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50"
                        >
                          <Checkbox
                            checked={
                              (role.permissions || []).some(
                                (p) => p.id === perm.id
                              )
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setData("permissions", [
                                  ...data.permissions,
                                  perm.name,
                                ]);
                              } else {
                                setData(
                                  "permissions",
                                  data.permissions.filter(
                                    (p) => p !== perm.name
                                  )
                                );
                              }
                            }}
                          />
                          <span className="text-sm">{perm.name}</span>
                        </label>
                      ))}
                    </div>

                    <Button
                      className="mt-4"
                      onClick={() => handleSubmit(role.id)}
                      disabled={processing}
                    >
                      Simpan Permissions
                    </Button>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <p className="text-gray-500 text-sm">
            Belum ada Role yang tersedia.
          </p>
        )}
      </div>
    </AdminLayout>
  );
}
