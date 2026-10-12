//Security Admin Links
const SecurityAdminLinks = [
  {
    menuName: "User Management",
    icon: "icon-manage-user mr-1 icon-size-one",
    subMenu: [
      { key: 1, name: "Edit Users", link: "/Admin/AddEditUsers" },
      { key: 2, name: "Create User", link: "/Admin/CreateEditRoles" },
      
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    subMenu: [
      { key: 3, name: "User Reports", link: "/Admin/UserReports" },
    ],
  },

];

export {
  SecurityAdminLinks,
  // SystemAdminLinks,
  // ManagerLinks,
  // DataEntryUserLinks,
};
