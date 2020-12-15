<template>
    <div id="container">
        <div>
            <h1>{{ msg }}</h1>

            <button @click="loadSampleData" class="p-2 mb-2">Load Sample Data</button>
        </div>

        <div id="columns">

            <div class="column pt-2">
                <div v-if="!list.length" class="mb-2">Your links list is empty. Start by adding a link.</div>
                <List :list-data="list" @addLink="onAddLink"></List>
            </div>

            <div class="column pt-2">
                <div v-if="!ads.length" class="mb-2">Your ads list is empty. Start by adding an ad.</div>
                <Ads :ads-data="ads" @addAd="onAddAd"></Ads>
            </div>

            <div class="column pt-2">
                <Results :data-list="list" :data-ads="ads"></Results>
            </div>
        </div>


    </div>
</template>

<script>

import List from './List';
import Ads from './Ads';
import Results from './Results';
import SampleData from '../assets/sampleData.json';

export default {
    components: {
        List,
        Ads,
        Results
    },
    name: 'Home',
        props: {
            msg: String
        },
        data() {
            return {
                list: [],
                ads: []
            }
        },

        methods: {
            onAddLink(data) {
                //this.list.push(data.formData);
                this.list.splice(data.index, 0, data.formData);
            },

            onAddAd(data) {
                this.ads.splice(data.index, 0, data.formData);
            },

            ensureListsAreEmpty() {
                let that = this;
                return new Promise(function(resolve, reject) {
                    if (that.list.length > 0 || that.ads.length > 0) {
                        let r = confirm('Your current lists will be wiped. Continue?');

                        if (r) {
                            that.list = [];
                            that.ads = [];
                            resolve('User confirmed wiping existing data.');
                        } else {
                            reject('User rejected to wipe existing data.');
                        }
                    } else {
                        resolve('Lists are empty.');
                    }
                })
            },

            loadSampleData() {
                let that = this;
                that.ensureListsAreEmpty().then((result) => {
                    console.log(result);

                    SampleData.links.forEach(function(element){
                        that.list.push(element);
                    });

                    SampleData.ads.forEach(function(element){
                        that.ads.push(element);
                    });

                    that.$forceUpdate();
                });
            }
        }
    }
</script>