<template>
    <div>
        <h3>Result <button @click="isAdsVisible = !isAdsVisible" v-if="ads.length">Toggle Ads</button> </h3>

        <ul class="no-list-style text-align-left">
            <ResultsItem 
                :element="element" 
                v-for="(element, index) in shiftedList" 
                :key="'r_' + index"
                :is-ads-visible="isAdsVisible"
                :index="index"></ResultsItem>
        </ul>
        
    </div>
</template>

<script>
import ResultsItem from './ResultsItem';

export default {
    name: 'Results',
    components: {
        ResultsItem
    },
    props: ['data-list', 'data-ads'],
    data() {
        return {
            list: [],
            ads: [],
            isAdsVisible: true
        }
    },
    mounted() {
        this.list = this.dataList;
        this.ads = this.dataAds;
    },
    watch: {
        dataAds() {
            this.ads = this.dataAds;
        },
        dataList() {
            this.list = this.dataList;
        }
    },

    computed: {

        combinedList() {
            let combinedList = this.list.concat(this.ads).sort(function(a,b){
                return a.time - b.time;
            });

            return combinedList;
        },

        shiftedList() {
            let offsetSeconds = 0;
            let newList = JSON.parse(JSON.stringify(this.combinedList));

            newList.forEach(function(item){
                if (item.duration) { //this is an ad, let's get the duration
                    offsetSeconds = offsetSeconds + item.duration;
                }

                if (!item.duration) { // this is a link, let's add the total offset to its position
                    item.time = item.time + offsetSeconds;
                }
            });

            return newList;
        }
    }
}
</script>