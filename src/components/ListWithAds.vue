<template>
    <div>
        <h3>Shifted Links</h3>

        <ul class="no-list-style text-align-left">
            <li v-for="(element, index) in listWithAds" :key="index">
                <div>
                    {{ element.shiftedMinutes }}:{{ element.shiftedSeconds }} element.text
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ListWithAds',
    props: ['data-list', 'data-ads'],
    data() {
        return {
            list: [],
            ads: [],
        }
    },
    mounted() {
        this.list = this.dataList,
        this.ads = this.dataAds
    },

    computed: {
        adsInBetween() {
            let elements = [];

            this.ads.forEach(function(ad){
                let element = {
                    'start': (ad.startingMin * 60) + ad.startingSec,
                    'duration': ad.duration
                }
                elements.push(element);
            });

            return elements;
        },

        listWithAds() {
            let elements = [];
            let that = this;

            this.list.forEach(function(element) {
                let offsetSeconds = 0;
                let linkPositionInSeconds = (element.minutes * 60) + element.seconds;

                that.adsInBetween.forEach(function(ad){
                    if (ad.start <= linkPositionInSeconds) {
                        offsetSeconds+= ad.duration;
                    }
                });

                linkPositionInSeconds+= offsetSeconds;
                element.shiftedMinutes = Math.floor(linkPositionInSeconds / 60);
                element.shiftedSeconds = linkPositionInSeconds - element.shiftedMinutes * 60;

                elements.push(element);
            });

            return elements;
        }
    }
}
</script>