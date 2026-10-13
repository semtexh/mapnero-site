import AppKit
import Foundation
guard CommandLine.arguments.count == 3 else { fatalError("Usage: exporter names.json output-directory") }
let names = try JSONDecoder().decode([String].self, from: Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1])))
for name in names {
 guard let symbol = NSImage(systemSymbolName:name, accessibilityDescription:nil)?.withSymbolConfiguration(NSImage.SymbolConfiguration(pointSize:32, weight:.semibold).applying(NSImage.SymbolConfiguration(paletteColors:[.white]))) else { fatalError("Missing native glyph: \(name)") }
 let rep=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:128,pixelsHigh:128,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
 NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=NSGraphicsContext(bitmapImageRep:rep)
 let scale=min(112/symbol.size.width,112/symbol.size.height),w=symbol.size.width*scale,h=symbol.size.height*scale
 symbol.draw(in:NSRect(x:(128-w)/2,y:(128-h)/2,width:w,height:h),from:.zero,operation:.sourceOver,fraction:1)
 NSGraphicsContext.restoreGraphicsState()
 try rep.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:CommandLine.arguments[2]).appendingPathComponent(name+".png"))
}
print("Exported \(names.count) native SF glyphs")
