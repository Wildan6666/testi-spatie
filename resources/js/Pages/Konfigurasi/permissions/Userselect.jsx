import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

export default function UserSelect({ users, selectedUser, onChange }) {
  const [query, setQuery] = useState("");

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-72">
      <Combobox value={selectedUser} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            className="w-full border rounded px-3 py-2"
            displayValue={(user) => user?.name || ""}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition as={Fragment} leave="transition ease-in duration-100">
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border rounded shadow-lg max-h-60 overflow-auto">
              {filteredUsers.length === 0 && (
                <div className="cursor-default select-none py-2 px-4 text-gray-500">
                  Tidak ada user
                </div>
              )}
              {filteredUsers.map((user) => (
                <Combobox.Option
                  key={user.id}
                  value={user}
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                >
                  {user.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
