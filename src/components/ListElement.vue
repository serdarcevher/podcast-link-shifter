<template>
    <li>
        <div class="time-holder mr-1">
            <span>(</span>
            <span v-if="element.minutes < 10">0</span><span v-text="element.minutes"></span>
            <span>:</span>
            <span v-if="element.seconds < 10">0</span><span v-text="element.seconds"></span>
            <span>)</span>
        </div>

        <span v-if="element.text" v-text="element.text" class="mr-1"></span>
        <span v-if="element.url" v-text="element.url"></span>
    </li>
</template>

<script>
export default {
    name: 'ListElement',
    props: ['data-element'],
    data() {
        return {
            element: {}
        }
    },
    mounted() {
        this.element = this.dataElement;
        console.log(this.element.minutes);
    }
}
</script>