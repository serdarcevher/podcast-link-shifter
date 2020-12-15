<template>
    <div>
        <h3>Result <button @click="isAdsVisible = !isAdsVisible">Toggle Ads</button> </h3>

        <ul class="no-list-style text-align-left">
            <ListWithAdsItem 
                :element="element" 
                v-for="(element, index) in shiftedList" 
                :key="index"
                :is-ads-visible="isAdsVisible"></ListWithAdsItem>
        </ul>
        
    </div>
</template>

<script>
import ListWithAdsItem from './ListWithAdsItem';

export default {
    name: 'ListWithAds',
    components: {
        ListWithAdsItem
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