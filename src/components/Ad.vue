<template>
    <li>
        <div class="time-holder mr-1">
            <span>(</span>
            <span v-if="element.startingMin < 10">0</span><span v-text="element.startingMin"></span>
            <span>:</span>
            <span v-if="element.startingSec < 10">0</span><span v-text="element.startingSec"></span>
            <span>)</span>
        </div>

        <div class="ad-bubble text-align-center pt-2 mb-2" v-text="adText"></div>
    </li>
</template>

<script>
export default {
    name: 'Ad',
    props: ['dataAd'],
    data() {
        return {
            element: {}
        }
    },
    computed: {
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