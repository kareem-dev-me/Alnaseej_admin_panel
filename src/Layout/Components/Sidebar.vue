<template>
    <div
        class="app-sidebar sidebar-shadow"
        @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
        @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
    >
        <div class="app-header__logo">
            <div class="logo-src" />
            <div class="header__pane ml-auto">
                <button
                    type="button"
                    class="hamburger close-sidebar-btn hamburger--elastic"
                    v-bind:class="{ 'is-active': isOpen }"
                    @click="toggleBodyClass('closed-sidebar')"
                >
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar
                class="app-sidebar-scroll"
                v-once
                v-if="menu.length != 0"
            >
                <sidebar-menu showOneChild :menu="menu" />
            </VuePerfectScrollbar>
        </div>
    </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
    components: {
        SidebarMenu,
        VuePerfectScrollbar
    },
    data() {
        return {
            isOpen: false,
            sidebarActive: false,
            collapsed: true,
            menu: [],
            windowWidth: 0
        };
    },
    computed: {
        menu_v: {
            get() {
                return [];
            },
            set(newVal) {
                this.menu = newVal;
            }
        }
    },
    props: {
        sidebarbg: String
    },
    methods: {
        toggleBodyClass(className) {
            const el = document.body;
            this.isOpen = !this.isOpen;

            if (this.isOpen) {
                el.classList.add(className);
            } else {
                el.classList.remove(className);
            }
        },
        toggleSidebarHover(add, className) {
            const el = document.body;
            this.sidebarActive = !this.sidebarActive;

            this.windowWidth = document.documentElement.clientWidth;

            if (this.windowWidth > "1") {
                if (add === "add") {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            }
        },
        getWindowWidth() {
            const el = document.body;

            this.windowWidth = document.documentElement.clientWidth;

            if (this.windowWidth < "1350") {
                el.classList.add("closed-sidebar", "closed-sidebar-md");
            } else {
                el.classList.remove("closed-sidebar", "closed-sidebar-md");
            }
        }
    },
    async mounted() {
        this.$nextTick(function() {
            window.addEventListener("resize", this.getWindowWidth);

            //Init
            this.getWindowWidth();
        });
        await this.$http
            .get("/admin/laundryServices", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                // this.laundry_services = res.data.map(item => {
                //     return { title: item.title, href: "" };
                // });
                const services = res.data.map(item => {
                    return { title: item.title, href: `/products/${item.id}` };
                });
                services.push({
                    title: "ادارة الخدمات",
                    href: "/manage_services"
                });
                this.menu = [
                    {
                        header: true,
                        title: "الرئيسية",
                        hiddenOnCollapse: true
                    },
                    {
                        title: "خدمات المغسلة",
                        icon: "pe-7s-tools",
                        child: services
                    },
                    {
                        title: " الطلبات",
                        icon: "pe-7s-plugin",
                        child: [
                            {
                                href: "assign_order",
                                title: "تعين الطلبات"
                            },
                            {
                                href: "/active_orders",
                                title: "الطلبات المفعلة"
                            },
                            {
                                href: "/orders_in_day",
                                title: "الطلبات في يوم معين"
                            },
                            {
                                href: "/delivered_orders",
                                title: "طلبات تم توصيلها"
                            }
                        ]
                    },
                    {
                        title: "الاشتراكات",
                        icon: "pe-7s-albums",
                        child: [
                            {
                                href: "/subscriptions",
                                title: "كل الاشتراكات"
                            },
                            {
                                href: "/add_subscriptions",
                                title: "اضافة اشتراك"
                            }
                        ]
                    },

                    {
                        title: "معلومات التطبيق",
                        icon: "pe-7s-config",
                        child: [
                            {
                                href: "/info",
                                title: "اظهار معلومات التطبيق"
                            },

                            {
                                href: "/edit_info",
                                title: "تعديل معلومات التطبيق"
                            }
                        ]
                    },
                    {
                        header: true,
                        title: "المستخدمين",
                        hiddenOnCollapse: true
                    },
                    {
                        title: "المستخدمين",
                        icon: "pe-7s-users",
                        child: [
                            {
                                href: "/users",
                                title: "اظهار المستخدمين"
                            },
                            {
                                href: "/add_user",
                                title: "تسجيل مستخدم جديد"
                            }
                        ]
                    },
                    {
                        title: "فتيان التوصيل",
                        icon: "pe-7s-id",
                        child: [
                            {
                                href: "/delivery_boys",
                                title: "اظهار كل فتيان التوصيل"
                            },
                            {
                                href: "/register_delivery_boy",
                                title: "تسجيل فتى توصيل جديد"
                            }
                        ]
                    },

                    {
                        header: true,
                        title: "الاموال",
                        hiddenOnCollapse: true
                    },
                    {
                        title: "وسائل الدفع",
                        icon: "pe-7s-credit",
                        href: "/payment"
                    },
                    {
                        title: "القسائم",
                        icon: "pe-7s-cash",
                        child: [
                            {
                                href: "/coupons",
                                title: "كل القسائم"
                            },
                            {
                                href: "/add_coupon",
                                title: "اضافة قسيمة"
                            }
                        ]
                    },
                    {
                        header: true,
                        title: "تسجيل الخروج",
                        hiddenOnCollapse: true
                    },
                    {
                        title: "الخروج",
                        icon: "pe-7s-power",
                        href: "/logout"
                    }
                ];

                console.log(this.laundry_services);
                console.log("mounted -> res", res);
            });
    },

    beforeDestroy() {
        window.removeEventListener("resize", this.getWindowWidth);
    }
};
</script>
