import process from "process/browser";
import { Buffer } from "buffer";

window.Buffer = Buffer;
window.process = process;

import("./render");
