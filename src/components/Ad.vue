<template>
    <li>
        <div class="time-holder mr-1">
            <span>(</span>
            <span v-if="minutes < 10">0</span><span v-text="minutes"></span>
            <span>:</span>
            <span v-if="seconds < 10">0</span><span v-text="seconds"></span>
            <span>)</span>
        </div>

        <div class="ad-bubble text-align-center pt-2 mb-2" v-text="adText"></div>
    </li>
</template>

<script>
import Helper from '../mixins/Helper.js';
export default {
    name: 'Ad',
    mixins: [Helper],
    props: ['dataAd'],
    data() {
        return {
            element: {}
        }
    },
    computed: {
        point() {
            return this.timetoMinsAndSecs(this.element.time)
        },
        minutes() {
            return this.point.minutes;
        },
        seconds() {
            return this.point.seconds;   
        },

        adText() {
            let text = this.element.duration + 's';
            if (this.element.description) {
                text+= ' (' + this.element.description + ')';
            }
            return text;
        }
    },
    mounted() {
        this.element = this.dataAd;
    }
}
</script>