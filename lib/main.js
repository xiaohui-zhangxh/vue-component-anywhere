import mixin from './mixin';

function add(name, component) {
    let components = install.Vue.$vcaComponents;
    if (Object.keys(components).includes(name)){
        console.warn(`component ${name} is defined, overriding...`)
    }
    components[name] = component;
}

function mount(element) {
    let role = element.getAttribute('role');
    let component = install.Vue.$vcaComponents[role];
    if (!component) {
        console.warn(`VCA role ${role} is not defined`)
    } else {
        let app = new install.Vue(component);
        let props = Object.assign({}, app.$options.props);
        if (props['htmlAttributes']) {
            let htmlAttributes = {};
            element.getAttributeNames().forEach(name => {
                htmlAttributes[name] = element.getAttribute(name);
            })
            app.$props['htmlAttributes'] = htmlAttributes;
        }
        app.$mount(element)
    }
}

function onLoad() {
    document.querySelectorAll('[rel="vca"]').forEach(el => mount(el))
}

function install(Vue, options={}) {
    if (install.installed) return;
    if (!Vue.$vcaComponents) {
        Vue.$vcaComponents = {}
    }
    install.Vue = Vue;
    Vue.mixin(mixin);
    document.addEventListener(options.onLoadEventName || 'DOMContentLoaded', onLoad)
}

export default { install, add, mount };