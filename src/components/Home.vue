<template>
    <div id="container">
        <div>
            <h1>{{ msg }}</h1>
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

            <div class="column pt-2"></div>
        </div>


    </div>
</template>

<script>
let sampleData = {

    links: [
        {
            minutes:0,
            seconds:18,
            text: 'Duyuru: Podcast yaparak geçinilir mi?',
            url: 'https://www.youtube.com/redirect?redir_token=QUFFLUhqbV9CeHAxWFp0UF'
        },
        {
            minutes:1,
            seconds:44,
            text: 'Türkiye Günlükleri serisi',
            url: null
        },
        {
            minutes:3,
            seconds:20,
            text: 'Berber muhabbeti',
            url: null
        },
        {
            minutes:6,
            seconds:0,
            text: 'Dilin amacı ne?',
            url: null
        }
    ],

    ads: [
        {
            startingMin: 0,
            startingSec: 30,
            duration: 12
        },
        {
            startingMin: 1,
            startingSec: 25,
            duration: 20,
            description: 'GoDaddy spot 1'
        }
    ]
};

import List from './List';
import Ads from './Ads';

export default {
    components: {
        List,
        Ads
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

        mounted() {
            let that = this;
            //console.log(sampleData);
            sampleData.links.forEach(function(element){
                that.list.push(element);
            });

            sampleData.ads.forEach(function(element){
                that.ads.push(element);
            });
        },

        methods: {
            onAddLink(data) {
                //this.list.push(data.formData);
                this.list.splice(data.index, 0, data.formData);
            },

            onAddAd(data) {
                this.ads.splice(data.index, 0, data.formData);
            }
        }
    }
</script>