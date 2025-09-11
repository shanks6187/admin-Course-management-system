import { mainRoutes } from "./index"
import { Route } from 'react-router-dom';
import { IMenuType } from "./inder";
import { Fragment } from "react/jsx-runtime";

export const renderRoutes = () => {
    let arr: IMenuType[] = []
    mainRoutes.forEach((item: any, index: any) => {
        if (item.children) {
            arr = [...arr, ...item.children]
        } else {
            arr.push(item)
        }
    })
    return arr.map((item: any) => {
        return <Route key={item.key} path={item.key} element={item.element} />
    })
}

export const renderRoutesfn = (routes: IMenuType[]) => {
    return routes.map((item: IMenuType) => {
        if (item.children) {
            return <Fragment key={item.key}>{renderRoutesfn(item.children)}</Fragment>
        } else {
            return <Route key={item.key} path={item.key} element={item.element}></Route>
        }
    })
}

export const appBreadcrumbRoutes = () => {
    let obj: Record<string, string> = {}
    function traverse(router: any[]) {
        router.forEach((item, index) => {
            if (item.children) {
                traverse(item.children)
            } else if (item.key && item.title) {
                let key = item.key
                obj[key] = item.title
            }
        })
    }
    traverse(mainRoutes)
    return obj
}

//权限树状图数据处理函数
export const appTreeRoutes = () => {
    // 返回树形结构，适用于权限树、菜单树等
    function traverse(router: any[]): any[] {
        return router.map(item => {
            const node: any = {
                title: item.title || item.label,
                key: item.key,
            };
            if (item.children && item.children.length > 0) {
                node.children = traverse(item.children);
            }
            return node;
        });
    }
    return traverse(mainRoutes);
};

// 递归返回的数据
// [
//   // 第一个路由项：无children，直接返回Route组件
//   <Route key="/dashboard" path="/dashboard" element={<Dashboard />} />,

//   // 第二个路由项：有children，递归处理后用Fragment包裹子Route
//   <Fragment key="/Course">
//     <Route key="/Course/Category" path="/Course/Category" element={<Category />} />
//     <Route key="/Course/Article" path="/Course/Article" element={<ArticleList />} />
//   </Fragment>
// ]