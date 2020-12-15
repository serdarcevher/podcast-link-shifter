<template>
    <li>
        <div class="time-holder mr-1">
            <span>(</span>
            <span v-if="minutes < 10">0</span><span v-text="minutes"></span>
            <span>:</span>
            <span v-if="seconds < 10">0</span><span v-text="seconds"></span>
            <span>)</span>
        </div>

        <span v-if="element.text" v-text="element.text" class="mr-1"></span>
        <span v-if="element.url" v-text="element.url"></span>
    </li>
</template>

<script>
import Helper from '../mixins/Helper.js';
export default {
    name: 'ListElement',
    mixins: [Helper],
    props: ['data-element'],
    computed: {
        point() {
            return this.timetoMinsAndSecs(this.element.time)
        },
        minutes() {
            return this.point.minutes;
        },
        seconds() {
            return this.point.seconds;   
        }
    },
    data() {
        return {
            element: {}
        }
    },
    mounted() {
        this.element = this.dataElement;
    }
}
</script>