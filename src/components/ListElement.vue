<template>
    <li>
        <button type="button" class="remove" @click="remove" v-if="!isResultItem">x</button>
        <div class="time-holder mr-1" @click="changeAudioTime">
            <span>(</span>
            <span v-if="minutes < 10">0</span><span v-text="minutes"></span>
            <span>:</span>
            <span v-if="seconds < 10">0</span><span v-text="seconds"></span>
            <span>)</span>
        </div>

        <span v-if="dataElement.text" v-text="dataElement.text" class="mr-1"></span>
        <span v-if="dataElement.url">
            <a :href="dataElement.url" target="_blank" v-text="dataElement.url"></a>
        </span>
    </li>
</template>

<script>
import Helper from '../mixins/Helper.js';
export default {
    name: 'ListElement',
    mixins: [Helper],
    props: ['data-element', 'is-result-item'],
    computed: {
        point() {
            return this.timetoMinsAndSecs(this.dataElement.time)
        },
        minutes() {
            return this.point.minutes;
        },
        seconds() {
            return this.point.seconds;   
        },
    },
    data() {
        return {}
    },
    methods: {
        remove() {
            let r = confirm('Are you sure you want to remove this item?');
            if (r) {
                this.$parent.$emit('remove', {'container': 'list', 'time': this.dataElement.time });
            }
        },
        changeAudioTime() {
            this.$parent.$emit('changeAudioTime', this.dataElement.time);
        }
    }
}
</script>