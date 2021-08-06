Component({
  behaviors: [],
  properties: {
    tabs:{
      type:Array, 
      value:[]
    }
  },
  data: {

  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    moved() {

    },
    detached() {

    },
  },
  methods: {
    handleTap(e){
      // console.log(e.currentTarget.dataset);
      const {index} = e.currentTarget.dataset;
      this.triggerEvent('itemChange', {index});

    }
  },
});