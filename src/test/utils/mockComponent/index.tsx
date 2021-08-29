function mockComponent(modulePath: string) {
  const propsSpy = jest.fn()

  const MockComponent = ({ children, ...props }: Record<string, any>) => {
    propsSpy(props)
    return <div>{children}</div>
  }

  jest.doMock(modulePath, () => MockComponent)

  return propsSpy
}

export default mockComponent
