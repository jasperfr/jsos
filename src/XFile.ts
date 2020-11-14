class XFile {
    name: string
    path: string
    type: string
    icon?: string
    
    constructor(name: string, path: string, type: string, icon?: string) {
        this.name = name;
        this.path = path;
        this.type = type;
        this.icon = icon;
    }
}