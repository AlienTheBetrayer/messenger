"use client";

import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  Input, 
  Field, 
  FieldLabel, 
  FieldDescription 
} from "@/shared"; // Swapped out generic names with your local workspace primitives

export default function ProfileSettingsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 py-10 px-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Page Architecture Header */}
      <div className="flex flex-col gap-1 border-b border-border/40 pb-5">
        <h1 className="text-2xl font-bold tracking-tighter">Account Settings</h1>
        <p className="text-xs text-muted-foreground/80 tracking-tight">
          Manage your enterprise node profiles, keys, and organizational defaults.
        </p>
      </div>

      {/* Profile Node Card */}
      <Card className="rounded-xl border border-border/60 bg-muted/5 shadow-xs overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/10 px-6 py-5">
          <CardTitle className="text-sm font-semibold tracking-tight">Public Identity</CardTitle>
          <CardDescription className="text-xs text-muted-foreground/70">
            This information is broadcasted across the cluster orchestration registry.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-5">
          {/* Avatar Matrix Block */}
          <div className="flex items-center gap-4 pb-4 border-b border-border/30">
            <div className="size-12 rounded-full bg-primary/10 border border-border flex items-center justify-center font-mono font-bold text-sm tracking-tighter select-none">
              OW
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-foreground">Profile Signature</h4>
              <p className="text-[11px] text-muted-foreground/70">PNG, JPEG under 4MB. Square aspect recommended.</p>
              <Button type="button" variant="outline" className="h-7 text-[10px] px-2.5 font-medium border-border/60">
                Update Image
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Field Instance: Handle */}
            <Field className="space-y-1.5">
              <FieldLabel htmlFor="username" className="text-xs font-medium">Handle ID</FieldLabel>
              <Input 
                id="username" 
                type="text" 
                defaultValue="outwave_dev" 
                className="h-9 text-xs font-mono border-border/50 bg-background focus-visible:ring-primary/20"
              />
              <FieldDescription className="text-[10px] text-muted-foreground/50">
                Your unique resource identifier node path.
              </FieldDescription>
            </Field>

            {/* Field Instance: Display Name */}
            <Field className="space-y-1.5">
              <FieldLabel htmlFor="name" className="text-xs font-medium">Display Name</FieldLabel>
              <Input 
                id="name" 
                type="text" 
                defaultValue="Alex Chen" 
                className="h-9 text-xs border-border/50 bg-background focus-visible:ring-primary/20"
              />
            </Field>
          </div>

          {/* Field Instance: Email Platform Endpoint */}
          <Field className="space-y-1.5">
            <FieldLabel htmlFor="email" className="text-xs font-medium">Communication Endpoint</FieldLabel>
            <div className="flex items-center gap-2">
              <Input 
                id="email" 
                type="email" 
                defaultValue="alex@outwave.io" 
                disabled 
                className="h-9 text-xs border-border/50 bg-muted/30 text-muted-foreground/80 font-mono flex-grow select-all"
              />
              <span className="text-[10px] font-mono font-medium text-emerald-500 bg-emerald-500/5 border border-emerald-500/10 px-2 py-1 rounded">
                Verified
              </span>
            </div>
          </Field>
        </CardContent>
      </Card>

      {/* Security Infrastructure Card */}
      <Card className="rounded-xl border border-border/60 bg-muted/5 shadow-xs overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/10 px-6 py-5">
          <CardTitle className="text-sm font-semibold tracking-tight">Security Credentials</CardTitle>
          <CardDescription className="text-xs text-muted-foreground/70">
            Configure access vectors and programmatic gateway verification tokens.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-border/30">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold">Two-Factor Authentication</h4>
              <p className="text-[11px] text-muted-foreground/70">Secure your pipeline layers using time-based OTP keys.</p>
            </div>
            <Button variant="outline" className="h-8 text-xs font-medium px-3 border-border/60">
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <h4 className="text-xs font-semibold">Active Workspace Sessions</h4>
              <p className="text-[11px] text-muted-foreground/70">Currently authenticated via 1 node endpoint.</p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/40">
              ID: 7e2a9b_node
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Primary Global Action Row */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/40">
        <Button variant="ghost" className="h-9 text-xs font-medium px-4 text-muted-foreground/80 hover:text-foreground">
          Cancel
        </Button>
        <Button className="h-9 text-xs font-semibold px-4 shadow-sm shadow-primary/10">
          Save Operational Changes
        </Button>
      </div>

    </div>
  );
}