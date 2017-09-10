Vue.component('test2', {
    template: `
        <input @blur="onBlur"></input>
    `,

    methods: {
        onBlur() {
            this.$emit("finished");
        }
    }
})

Vue.component('test', {
    template: `
        <div>    
            <test2 @finished="onFinished"></test2>
        </div>
    `,

    methods: {
        onFinished() {
            alert('on finished!');
        }
    }
});

Vue.component('tabs', {
    template: `
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                    <a :href="tab.href" @click="selectTab(tab)"> {{ tab.name }} </a>
                </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
    `,

    data() {
        return {tabs: []};
    },

    created() {
        this.tabs = this.$children;
    },

    methods: {
        selectTab(SelectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == SelectedTab.name);
            });
        }
    }
});


Vue.component('tab', {
    template: `
        <div v-show="isActive"><slot></slot></div>
    `,

    props: {
        name: { required: true },
        selected: { default: false }
    },
    
    data() {
        return {
            isActive: false
        }
    },

    computed: {
        href() {
            return '#' + this.name.toLowerCase().replace(/ /g, '-');
        }
    },

    mounted() {
        this.isActive = this.selected
    }
})
new Vue({
    el:'#root',

    data: {
        showModal: false
    },
    methods: {
        onTestFinished() {
            alert('on test finished!');
        }
    }
})