import { types, onSnapshot } from "mobx-state-tree"

export default types.model("Admin", {
    title: types.string,
}).actions(self => ({
    setTitle(title) {
        self.title = title;
    }
}));
