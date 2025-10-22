import { useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User } from "lucide-react";

export default function RolesPage({ roles = [], permissions = [] }) {
  const { data, setData, processing } = useForm({
    rolePermissions: roles.reduce((acc, role) => {
      acc[role.id] = role.permissions.map((p) => p.name);
      return acc;
    }, {}),
  });

  const handleSubmit = (roleId) => {
    router.post(route("roles.updatePermissions", roleId), {
      permissions: data.rolePermissions[roleId],
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Hak Akses Pengguna
          </h1>
          <span className="text-sm text-gray-500">
            Total Role: {roles.length}
          </span>
        </div>

        <Card className="shadow-md border border-orange-100 bg-gray-50">
          <CardContent className="pt-6">
            <Tabs defaultValue={roles[0]?.id?.toString()}>
              
              {/* 🎯 Tabs List — Role di Tengah */}
              <TabsList className="flex flex-wrap justify-center gap-3 bg-transparent mb-6">
                {roles.map((role) => (
                  <TabsTrigger
                    key={role.id}
                    value={role.id.toString()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-600 font-medium border border-orange-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500 transition-all duration-200 shadow-sm"
                  >
                    <User size={16} />
                    {role.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* 🎨 Isi Tiap Tab */}
              {roles.map((role) => (
                <TabsContent
                  key={role.id}
                  value={role.id.toString()}
                  className="mt-4"
                >
                  {/* ✅ Grid Permission */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {permissions.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-center gap-2 px-3 py-2 border border-orange-100 rounded-lg bg-white shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer"
                      >
                        {/* Checkbox dengan Warna Oranye */}
                        <Checkbox
                          checked={data.rolePermissions[role.id]?.includes(
                            perm.name
                          )}
                          onCheckedChange={(checked) => {
                            setData("rolePermissions", {
                              ...data.rolePermissions,
                              [role.id]: checked
                                ? [...data.rolePermissions[role.id], perm.name]
                                : data.rolePermissions[role.id].filter(
                                    (p) => p !== perm.name
                                  ),
                            });
                          }}
                          className="border-2 border-orange-400 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <span className="text-sm text-gray-700 truncate">
                          {perm.name}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Tombol Simpan */}
                  <div className="mt-6 flex justify-end">
                    <Button
                      className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm rounded-lg"
                      disabled={processing}
                      onClick={() => handleSubmit(role.id)}
                    >
                      Simpan Permissions
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
