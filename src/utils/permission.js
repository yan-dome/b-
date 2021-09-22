// 角色对应关系  权限列表
const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'List',
  },
  {
    name: 'Edio',
  }, {
    name: 'Add',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'List',
  }, {
    name: 'Add',
  },
  {
    name: 'Edio',
  }, {
    name: 'Category',
  }],
};
/**
 *
 * @param {String} role
 * @param {Ayyay} routes
 * 过滤掉没有权限的路由
 */
// 导出一个需要的路由
export default function getMenuRouter(role, routes) {
  // 选出需要的名称
  const allRoutesName = roleToRouter[role].map((item) => item.name);
  // 过滤掉没有有当前路由的名字
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
    // 最终结果返回给res
  return resultRoutes;
}
