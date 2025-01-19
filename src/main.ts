import { MarkdownView, Plugin } from "obsidian";

export default class MoveTabsPlugin extends Plugin {
    async onload() {
        this.addCommand({
            id: "move-tab-left",
            name: "Move Tab Left",
            hotkeys: [{ modifiers: ["Ctrl", "Alt", "Shift"], key: "ArrowLeft" }],
            repeatable: true,
            editorCallback: (editor: Editor, view: MarkdownView) => this.moveTab(-1),
        });

        this.addCommand({
            id: "move-tab-right",
            name: "Move Tab Right",
            hotkeys: [{ modifiers: ["Ctrl", "Alt", "Shift"], key: "ArrowRight" }],
            repeatable: true,
            editorCallback: (editor: Editor, view: MarkdownView) => this.moveTab(1),
        });
    }

    moveTab(direction: -1 | 1) {
        const activeTab = this.app.workspace.getLeaf();
        const tabGroup = activeTab.parent;
        const tabList = tabGroup.children;
        const activeTabIndex = tabList.indexOf(activeTab); // index de activeTab dans tabList
        const activeTabNewIndex = activeTabIndex + direction; // index qu'activeTab doit avoir : -1 ou +1 si left ou right

        if (activeTabNewIndex < 0 || activeTabNewIndex >= tabList.length) return; // Si on est au bout

        // Change activetab de place dans le tabList
        tabList.splice(activeTabIndex, 1);
        tabList.splice(activeTabNewIndex, 0, activeTab);
        
        tabGroup.recomputeChildrenDimensions(); // actualise l'affichage de la tabList
        this.app.workspace.revealLeaf(tabList[activeTabNewIndex]) // Met le focus sur activeTab at activeTabNewIndex
    }
}