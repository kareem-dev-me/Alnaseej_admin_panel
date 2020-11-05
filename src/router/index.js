import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        // Dashboards

        {
            path: '/',
            name: 'analytics',
            component: () => import('../DemoPages/Dashboards/Analytics.vue'),
        },

        // Pages

        {
            path: '/login',
            name: 'login-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../pages/login.vue'),
        },
        // users
        {
            path: '/users',
            name: 'users',
            component: () => import('../pages/users.vue'),
        },
        // payment
        {
            path: '/payment',
            name: 'payment',
            component: () => import('../pages/payment.vue'),
        },
        // delivery boys
        {
            path: '/delivery_boys',
            name: 'delivery_boys',
            component: () => import('../pages/delivery_boys.vue'),
        },
        {
            path: '/register_delivery_boy',
            name: 'register_delivery_boy',
            component: () => import('../pages/register_delivery_boy.vue'),
        },
        // info
        {
            path: '/info',
            name: 'info',
            component: () => import('../pages/info.vue'),
        },
        {
            path: '/set_info',
            name: 'set_info',
            component: () => import('../pages/set_info.vue'),
        },
        {
            path: '/edit_info',
            name: 'edit_info',
            component: () => import('../pages/edit_info.vue'),
        },
        // subscriptions
        {
            path: '/subscriptions',
            name: 'subscriptions',
            component: () => import('../pages/subscriptions.vue'),
        },
        {
            path: '/add_subscriptions',
            name: 'add_subscriptions',
            component: () => import('../pages/add_subscriptions.vue'),
        },
        // orders
        {
            path: '/active_orders',
            name: 'active_orders',
            component: () => import('../pages/active_orders.vue'),
        },
        // coupons
        {
            path: '/coupons',
            name: 'coupons',
            component: () => import('../pages/coupons.vue'),
        },
        {
            path: '/add_coupon',
            name: 'add_coupon',
            component: () => import('../pages/add_coupon.vue'),
        },
        {
            path: '/pages/register-boxed',
            name: 'register-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/RegisterBoxed.vue'),
        },
        {
            path: '/pages/forgot-password-boxed',
            name: 'forgot-password-boxed',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/ForgotPasswordBoxed.vue'),
        },

        // Elements

        {
            path: '/elements/buttons-standard',
            name: 'buttons-standard',
            component: () => import('../DemoPages/Elements/Buttons/Standard.vue'),
        },
        {
            path: '/elements/dropdowns',
            name: 'dropdowns',
            component: () => import('../DemoPages/Elements/Dropdowns.vue'),
        },
        {
            path: '/elements/icons',
            name: 'icons',
            component: () => import('../DemoPages/Elements/Icons.vue'),
        },
        {
            path: '/elements/badges-labels',
            name: 'badges',
            component: () => import('../DemoPages/Elements/Badges.vue'),
        },
        {
            path: '/elements/cards',
            name: 'cards',
            component: () => import('../DemoPages/Elements/Cards.vue'),
        },
        {
            path: '/elements/list-group',
            name: 'list-group',
            component: () => import('../DemoPages/Elements/ListGroups.vue'),
        },
        {
            path: '/elements/timelines',
            name: 'timeline',
            component: () => import('../DemoPages/Elements/Timeline.vue'),
        },
        {
            path: '/elements/utilities',
            name: 'utilities',
            component: () => import('../DemoPages/Elements/Utilities.vue'),
        },

        // Components

        {
            path: '/components/tabs',
            name: 'tabs',
            component: () => import('../DemoPages/Components/Tabs.vue'),
        },
        {
            path: '/components/accordions',
            name: 'accordions',
            component: () => import('../DemoPages/Components/Accordions.vue'),
        },
        {
            path: '/components/modals',
            name: 'modals',
            component: () => import('../DemoPages/Components/Modals.vue'),
        },
        {
            path: '/components/progress-bar',
            name: 'progress-bar',
            component: () => import('../DemoPages/Components/ProgressBar.vue'),
        },
        {
            path: '/components/tooltips-popovers',
            name: 'tooltips-popovers',
            component: () => import('../DemoPages/Components/TooltipsPopovers.vue'),
        },
        {
            path: '/components/carousel',
            name: 'carousel',
            component: () => import('../DemoPages/Components/Carousel.vue'),
        },
        {
            path: '/components/pagination',
            name: 'pagination',
            component: () => import('../DemoPages/Components/Pagination.vue'),
        },
        {
            path: '/components/maps',
            name: 'maps',
            component: () => import('../DemoPages/Components/Maps.vue'),
        },

        // Tables

        {
            path: '/tables/regular-tables',
            name: 'regular-tables',
            component: () => import('../DemoPages/Tables/RegularTables.vue'),
        },

        // Dashboard Widgets

        {
            path: '/widgets/chart-boxes-3',
            name: 'chart-boxes-3',
            component: () => import('../DemoPages/Widgets/ChartBoxes3.vue'),
        },

        // Forms

        {
            path: '/forms/controls',
            name: 'controls',
            component: () => import('../DemoPages/Forms/Elements/Controls.vue'),
        },
        {
            path: '/forms/layouts',
            name: 'layouts',
            component: () => import('../DemoPages/Forms/Elements/Layouts.vue'),
        },
        // Charts

        {
            path: '/charts/chartjs',
            name: 'chartjs',
            component: () => import('../DemoPages/Charts/Chartjs.vue'),
        },
    ]
})
