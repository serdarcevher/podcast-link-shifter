<template>
    <div id="container">
        <div>
            <h1>{{ msg }}</h1>
        </div>

        <div id="columns">

            <div class="column">

                <div v-if="!list.length" class="mb-2">Your list is empty. Start by adding a link.</div>
                <List :list-data="list" @addLink="onAddLink"></List>

            </div>

            <div class="column"></div>

            <div class="column"></div>
        </div>


    </div>
</template>

<script>
let sampleData = [
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
];

import List from './List';

export default {
    components: {
        List
    },
    name: 'Home',
        props: {
            msg: String
        },
        data() {
            return {
                list: []
            }
        },

        mounted() {
            let that = this;
            sampleData.forEach(function(element){
                that.list.push(element);
            });
        },

        methods: {
            onAddLink(data) {
                //this.list.push(data.formData);
                this.list.splice(data.index, 0, data.formData);
            },
        }
    }
</script>