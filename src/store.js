import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        recipes: [],
        groceries: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setRecipes(state, recipes) {
            state.recipes = recipes;
        },
        setGroceries(state, groceries) {
            state.groceries = groceries;
        }

    },
    actions: {

        async login(context, data) {
            try {
                let response = await axios.post("/api/users/login", data);
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },

        async logout(context) {
            try {
                await axios.delete("/api/users");
                context.commit('setUser', null);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },

        async upload(context, data) {
            try {
                await axios.post('/api/recipes', data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        },

        async getMyRecipes(context) {
            try {
                let response = await axios.get("/api/recipes");
                context.commit('setRecipes', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },

        async getMyGroceries(context) {
            try {
                let response = await axios.get("/api/groceries");
                context.commit('setGroceries', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },

        async getUser(context) {
            try {
                let response = await axios.get("/api/users");
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },

        async getAllRecipes(context) {
            try {
                let response = await axios.get("/api/recipes/all");
                context.commit('setRecipes', response.data);
                return "";
            } catch (error) {
                return "";
            }
        },

        async register(context, data) {
            try {
                let response = await axios.post("/api/users", data);
                context.commit('setUser', response.data);
                return "";
            } catch (error) {
                return error.response.data.message;
            }
        }

    }
})
