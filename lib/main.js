import mixin from './mixin';

const VCA = {
    Vue: null,
    components: {}
}

export function addComponent(name, component) {
    VCA.components[name] = component;
}

export function mount(element) {
    let role = element.getAttribute('role');
    let component = VCA.components[role];
    if (!component) {
        console.warn(`VCA role ${role} is not defined`)
    } else {
        let app = new VCA.Vue(component);
        let props = Object.assign({}, app.$options.props);
        if (props['htmlAttributes']) {
            let htmlAttributes = {};
            element.getAttributeNames().forEach(name => {
                htmlAttributes[name] = element.getAttribute(name);
            })
            app.$props['htmlAttributes'] = htmlAttributes;
            delete props['htmlAttributes'];
        }
        app.$mount(element)
    }
}

function onLoad() {
    document.querySelectorAll('[rel="vca"]').forEach(el => mount(el))
}

function plugin(Vue, options) {
    options = options || {};
    VCA.Vue = Vue;
    VCA.options = Object.assign({}, options);
    if (plugin.installed) {
        console.warn('plugin installed')
        return;
    }
    Vue.mixin(mixin);
    document.addEventListener(options.onLoadEventName || 'DOMContentLoaded', onLoad)
}

export default plugin;