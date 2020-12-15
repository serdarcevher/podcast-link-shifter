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
            <ListElement v-for="element in list" v-bind:key="element.time" :data-element="element"></ListElement>
        </ul>

    </div>

</template>

<script>
import Helper from '../mixins/Helper';
import ListElement from './ListElement';
export default {
    name: 'List',
    components: { ListElement },
    mixins: [Helper],
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
    watch: {
        listData() {
            this.list = this.listData
        }
    },
    methods: {
        addLink() {
            if (!this.minutes) {
                this.minutes = 0;
            }

            if (!this.seconds) {
                this.seconds = 0;
            }

            if (this.seconds > 59 || this.seconds < 0) {
                alert('Invalid seconds value');
                return;
            }

            if (this.minutes < 0) {
                alert('Invalid minutes value');
                return;
            }

            let formData = {
                'time': (this.minutes * 60) + this.seconds,
                'text': this.text,
                'url': this.url,
            };

            if (!formData.text.length && !formData.url.length) {
                alert('Both text and link fields cannot be empty');
                return;
            }

            if (this.list.some(e => e.time == formData.time)) {
                alert('A link for this point already exists');
                return;
            }

            let index = this.findIndexInList(formData.time, this.list);

            this.resetForm();
            this.$emit('addLink', { formData: formData, index: index });
        },

        resetForm() {
            this.minutes = null;
            this.seconds = null;
            this.text = '';
            this.url = '';
        }
    }
}
</script>