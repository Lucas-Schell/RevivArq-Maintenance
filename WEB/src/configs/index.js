import env from 'configs/environment'
import routing_configs from 'configs/route_configs'

export const api = env.api_url

export const getRouteConfigs = (route) => {
    let route_specific_configs = {}

    if (route && routing_configs[route]) {
        route_specific_configs = routing_configs[route]
    }

    return {
        ...routing_configs['default'],
        ...route_specific_configs
    }
}
