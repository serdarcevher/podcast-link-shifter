<template>
    <li>
        <button type="button" class="remove" @click="remove" v-if="!isResultItem">x</button>
        <div class="time-holder ad mr-1" @click="changeAudioTime">
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
    props: ['data-ad', 'is-result-item'],
    data() {
        return {}
    },
    computed: {
        point() {
            return this.timetoMinsAndSecs(this.dataAd.time)
        },
        minutes() {
            return this.point.minutes;
        },
        seconds() {
            return this.point.seconds;   
        },

        adText() {
            let text = this.dataAd.duration + 's';
            if (this.dataAd.description) {
                text+= ' (' + this.dataAd.description + ')';
            }
            return text;
        }
    },
    methods: {
        remove() {
            let r = confirm('Are you sure you want to remove this item?');
            if (r) {
                this.$parent.$emit('remove', {'container': 'ads', 'time': this.dataAd.time });
            }
        },
        changeAudioTime() {
            this.$parent.$emit('changeAudioTime', this.dataAd.time);
        }
    }
}
</script>