import { useCallback, useState } from 'react'

export type ShaderHookProps = {
  shaders: any[]
  init_shaders: (skin: any, prev: any) => void
  on_shader_event: (d: any, target: any) => void
}

export function useShader(): ShaderHookProps {
  const [shaders, setShaders] = useState([])
  // Init shaders from extensions
  const init_shaders = useCallback((skin, prev) => {
    if (skin !== prev) {
      let filterShader = shaders
      if (prev) {
        filterShader = filterShader.filter((x) => x.owner !== prev.id)
        setShaders(filterShader)
      }
      for (var Shader of skin.shaders) {
        let shader = new Shader()
        shader.owner = skin.id
        setShaders((prevState) => [...prevState, shader])
      }
      // TODO: Sort by zIndex
    }
  }, [])
  const on_shader_event = useCallback((d, target) => {
    if (d.event === 'new-shader') {
      if (d.args[0].target === target) {
        d.args[0].id = `${d.args[1]}-${d.args[2]}`
        setShaders((prevState) => [...prevState, d.args[0]])
        // this.rerender++
      }
    }
    if (d.event === 'remove-shaders') {
      let id = d.args.join('-')
      setShaders((prevState) => prevState.filter((x) => x.id !== id))
    }
  }, [])

  return {
    shaders,
    init_shaders,
    on_shader_event,
  } as const
}

export const withShaderHOC = <T extends ShaderHookProps>(Component: React.ComponentType<T>) => {
  return (props: any) => {
    const shaderHook = useShader()

    return <Component {...shaderHook} {...props} />
  }
}
