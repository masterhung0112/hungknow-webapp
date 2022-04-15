export const Toggle = {
    mixins: [],
    args: 'target',
    props: {
        href: String,
        target: null,
        mode: 'list',
        queued: Boolean,
    },
    data: {
        href: false,
        target: false,
        mode: 'click',
        queued: true
    },

    methods: {
        toggle(type: string) {
            console.log(type)
        }
    }
}