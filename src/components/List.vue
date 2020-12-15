<template>
    <div>
        <h3>Links</h3>
        <form @keyup.enter="addLink" ref="dataForm">
            <p>
                <label>Time: </label>
                <input type="number" v-model.number="minutes" name="minutes" placeholder="00" class="short-input" min="0" /> :
                <input type="number" v-model.number="seconds" name="seconds" placeholder="01" class="short-input" min="0" max="59" />
            </p>

            <p>
                <label>Text:</label> <input type="text" v-model="text" autocomplete="off" name="text" class="long-input mb-2" placeholder="Optional if URL exists" />
            </p>
            <p>
                <label>URL:</label> <input type="text" v-model="url" autocomplete="off" name="link" class="long-input" placeholder="Optional if text exists" />
            </p>

            <button type="button" class="btn mt-1 p-2" @click="addLink">Add Link</button>

        </form>

        <ul id="elements-list" class="text-align-left no-list-style centered">
            <ListElement v-for="element in list" v-bind:key="element.minutes + '_' + element.seconds" :data-element="element"></ListElement>
        </ul>

    </div>

</template>

<script>
import ListElement from './ListElement';
export default {
    name: 'List',
    components: { ListElement },
    data() {
        return {
            list: [],

            minutes: null,
            seconds: null,
            text: '',
            url: '',
        }
    },
    props: ['list-data'],
    mounted() {
        this.list = this.listData;
    },
    methods: {
        addLink() {
            let formData = {
                'minutes': this.minutes,
                'seconds': this.seconds,
                'text': this.text,
                'url': this.url,
                'type': 'link'
            };

            console.log(formData.text);

            if (!formData.text.length && !formData.url.length) {
                alert('Both text and link fields cannot be empty');
                return;
            }

            if (!formData.minutes) {
                formData.minutes = 0;
            }

            if (!formData.seconds) {
                formData.seconds = 0;
            }

            if (formData.seconds > 59 || formData.seconds < 0) {
                alert('Invalid seconds value');
                return;
            }

            if (formData.minutes < 0) {
                alert('Invalid minutes value');
                return;
            }

            if (this.list.some(e => e.minutes == formData.minutes && e.seconds == formData.seconds)) {
                alert('A link for this point already exist');
                return;
            }

            let index = this.findLinkPosition(formData.minutes, formData.seconds);

            this.$refs['dataForm'].reset();
            this.$emit('addLink', { formData: formData, index: index });
        },

        findLinkPosition(minutes, seconds) {
            let index = 0;
            let secondsSum = (minutes * 60) + seconds;

            this.list.forEach(function(element){

                let elementSecondsSum = (element.minutes * 60) + element.seconds;
                if (elementSecondsSum <= secondsSum) {
                    index++;
                }
                console.log(element);
            });

            return index;
        }
    }
}
</script>