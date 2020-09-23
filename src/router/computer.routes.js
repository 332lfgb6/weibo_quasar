export const getComputerRoutes = store => {
  return [
    {
      path: '*',
      component: () => import('pages/ComputerIndex')
    }
  ]
}
