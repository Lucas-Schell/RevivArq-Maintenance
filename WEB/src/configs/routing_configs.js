const route_configs = {
    "/login": {
        header: {
            show: true
        }
    },
    default: {
        header: {
            show: true
        },
        onAuthenticate: {
            print_state: false,
            print_props: false
        },
        onRender: {
            show_json_state: false,
            show_json_props: false
        }
    }
};

export default route_configs;
