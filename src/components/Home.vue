<template>
    <div id="container">
        <div>
            <h1>{{ msg }}</h1>

            <button @click="loadSampleData" class="p-2 mb-2">Load Sample Data</button>
            <button @click="saveFile" v-if="list.length" class="p-2 ml-1 mb-2">Save to File</button>
            <button @click="$refs.file.click()" class="p-2 ml-1 mb-2">Load from File</button>

            <input type="file" multiple="false" ref="file" accept="application/JSON" @change="loadFromFile" style="display: none">
        </div>

        <div id="columns">

            <div class="column pt-2">
                <div v-if="!list.length" class="mb-2">Your links list is empty. Start by adding a link.</div>
                <List :list-data="list" @addLink="onAddLink" @remove="onRemove" @changeAudioTime="onChangeAudioTime"></List>
            </div>

            <div class="column pt-2">
                <div v-if="!ads.length" class="mb-2">Your ads list is empty. Start by adding an ad.</div>
                <Ads :ads-data="ads" @addAd="onAddAd" @remove="onRemove" @changeAudioTime="onChangeAudioTime"></Ads>
            </div>

            <div class="column pt-2">
                <Results :data-list="list" :data-ads="ads" @changeAudioTime="onChangeAudioTime"></Results>
            </div>
        </div>


        <div id="right-top">
            <Player :selected-time="selectedAudioTime"></Player>
        </div>
    </div>
</template>

<script>

import List from './List';
import Ads from './Ads';
import Results from './Results';
import Player from './Player';
import SampleData from '../assets/sampleData.json';

export default {
    components: {
        List,
        Ads,
        Results,
        Player
    },
    name: 'Home',
        props: {
            msg: String
        },
        data() {
            return {
                list: [],
                ads: [],
                selectedAudioTime: 0
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

            onRemove(data) {
                this[data.container] = this[data.container].filter(x => x.time !== data.time);
            },

            onChangeAudioTime(time) {
                this.selectedAudioTime = time;
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
            },

            saveFile() {
                let content = {
                    'list': this.list,
                    'ads': this.ads
                };
                let fileName = "myPodcast.json";

                const data = JSON.stringify(content)
                const blob = new Blob([data], {type: 'text/plain'})
                const e = document.createEvent('MouseEvents'),
                a = document.createElement('a');
                a.download = fileName;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            },

            loadFromFile(event) {
                let that = this;
                const reader = new FileReader();
                const file = event.target.files[0];
                const blob = new Blob([file], {type:"application/json"});

                reader.addEventListener("load", e => {
                    try {

                        let data = JSON.parse(e.target.result);
                        if (!data.list[0].text) {
                            alert('Wrong file format.');
                            return;
                        }

                        that.list = data.list;
                        that.ads = data.ads;
                    } catch (error) {
                        alert('We could not load the list. Are you sure that the file was exported from here?');
                    }
                });

                reader.readAsText(blob);
            }
        }
    }
</script>