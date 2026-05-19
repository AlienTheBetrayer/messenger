"use client";

import * as React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    Checkbox,
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem, ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator, ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    ItemGroup,
    ItemSeparator,
    Popover,
    PopoverTrigger,
    PopoverContent,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    Separator,
    Slider,
    Switch,
    Textarea,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
    Toaster
} from "@/shared/ui";
import { toast } from "sonner";
import {
    ActivityIcon,
    ArrowRightIcon,
    BellIcon, CheckCircle2Icon,
    ChevronDownIcon,
    CodeIcon,
    HelpCircleIcon,
    LayersIcon,
    MailIcon, SearchIcon,
    SettingsIcon,
    SparklesIcon,
    TrashIcon,
    UserIcon
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

// Mock data for Recharts demo
const chartData = [
  { name: "Jan", visits: 400, sales: 240 },
  { name: "Feb", visits: 300, sales: 1398 },
  { name: "Mar", visits: 200, sales: 9800 },
  { name: "Apr", visits: 2780, sales: 3908 },
  { name: "May", visits: 1890, sales: 4800 },
  { name: "Jun", visits: 2390, sales: 3800 },
  { name: "Jul", visits: 3490, sales: 4300 },
];

const chartConfig = {
  visits: {
    label: "Visits",
    color: "var(--primary)",
  },
  sales: {
    label: "Sales",
    color: "var(--accent)",
  },
};

export default function Home() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([40]);
  const [switchState, setSwitchState] = React.useState<boolean>(true);
  const [checkboxState, setCheckboxState] = React.useState<
    boolean | "indeterminate"
  >(true);
  const [dropdownRadio, setDropdownRadio] = React.useState<string>("personal");
  const [contextRadio, setContextRadio] = React.useState<string>("medium");
  const [themeSelection, setThemeSelection] = React.useState<string>("system");

  const triggerToast = (type: "success" | "info" | "warning" | "error") => {
    if (type === "success") {
      toast.success("Success! System configured correctly.", {
        description: "All components loaded successfully.",
      });
    } else if (type === "info") {
      toast.info("Information updated", {
        description: "Theme setting has been modified.",
      });
    } else if (type === "warning") {
      toast.warning("Warning triggered", {
        description: "Storage quota is running low.",
      });
    } else {
      toast.error("Operation failed", {
        description: "Unable to sync cloud preferences.",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
          <div className="max-w-400 mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase">
                  v1.0.0 Stable
                </span>
                <SparklesIcon className="size-4 text-primary animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Gravity Component Library
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                An active showcase demonstrating 21 professional custom
                components.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="sm"
                variant="success"
                onClick={() => triggerToast("success")}
                className="gap-2"
              >
                <CheckCircle2Icon className="size-4" />
                Trigger Toast
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => triggerToast("error")}
                className="gap-2"
              >
                <TrashIcon className="size-4" />
                Trigger Error
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="gap-2">
                    <SettingsIcon className="size-4" />
                    Settings
                    <ChevronDownIcon className="size-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => triggerToast("info")}>
                    <UserIcon className="size-4 mr-2" />
                    Profile Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="size-4 mr-2" />
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={dropdownRadio}
                    onValueChange={setDropdownRadio}
                  >
                    <DropdownMenuRadioItem value="personal">
                      Personal Space
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="corporate">
                      Corporate Workspace
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="max-w-400 mx-auto p-6 space-y-8">
          {/* Top Row: Hero Slider / Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Featured Highlights
                </h2>
                <p className="text-xs text-muted-foreground">
                  Interactive slide items demonstrating layouts.
                </p>
              </div>
            </div>

            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <Card className="border border-border/50 bg-card/60 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <SparklesIcon className="text-primary size-5" />
                        Next-Gen Animation & Ripple FX
                      </CardTitle>
                      <CardDescription>
                        Experience micro-interactions designed to mimic
                        professional interfaces.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                        Each interactive control component dynamically binds
                        fluid visual feedback. Try clicking various buttons
                        below to preview the color-mix responsive ripple
                        effects.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <Button variant="default">Default Accent</Button>
                        <Button variant="secondary">Secondary Element</Button>
                        <Button variant="outline">Outline Border</Button>
                        <Button variant="ghost">Ghost Trigger</Button>
                        <Button variant="blue">Dynamic Blue</Button>
                        <Button variant="success">Success Green</Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card className="border border-border/50 bg-card/60 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <LayersIcon className="text-primary size-5" />
                        Fluid Responsive Design System
                      </CardTitle>
                      <CardDescription>
                        Fully integrated variables scaling seamlessly across
                        mobile and desktop.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                        Our layout parameters utilize clamp scaling models
                        preventing typography conflicts or disproportionate
                        container boundaries regardless of current viewport
                        configurations.
                      </p>
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={switchState}
                            onCheckedChange={setSwitchState}
                          />
                          <span className="text-sm font-medium">
                            Responsive scaling active
                          </span>
                        </div>
                        <Separator orientation="vertical" className="h-6" />
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={checkboxState}
                            onCheckedChange={setCheckboxState}
                          />
                          <span className="text-sm font-medium">
                            Automatic system adaptation
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>

              <div className="hidden md:block relative">
                <CarouselPrevious className="absolute! left-4" />
                <CarouselNext className="absolute! right-4" />
              </div>
            </Carousel>
          </section>

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Forms & Controls */}
            <Card className="col-span-1 border border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Form Inputs & Values
                </CardTitle>
                <CardDescription>
                  Integrated input formats and interactive controllers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Standard Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Full Name
                  </label>
                  <Input placeholder="Enter your full name..." />
                </div>

                {/* Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Short Bio
                  </label>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="min-h-20 resize-y"
                  />
                </div>

                {/* InputGroup */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    API Endpoint
                  </label>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <span className="text-xs">https://</span>
                    </InputGroupAddon>
                    <InputGroupInput placeholder="api.gravity.dev/v1" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => triggerToast("info")}
                      >
                        <SearchIcon className="size-3.5" />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Theme Configuration
                  </label>
                  <Select
                    value={themeSelection}
                    onValueChange={setThemeSelection}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose theme preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Combobox */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Search Framework
                  </label>
                  <Combobox>
                    <ComboboxInput
                      placeholder="Choose component framework..."
                      showClear
                    />
                    <ComboboxContent>
                      <ComboboxList>
                        <ComboboxItem value="react">React</ComboboxItem>
                        <ComboboxItem value="nextjs">Next.js</ComboboxItem>
                        <ComboboxItem value="svelte">Svelte</ComboboxItem>
                        <ComboboxItem value="vue">Vue</ComboboxItem>
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>

                {/* Checkbox, Switch toggles */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <Checkbox id="marketing" />
                    <label
                      htmlFor="marketing"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Subscribe to weekly updates
                    </label>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium leading-none">
                        Push Notifications
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Receive real-time system alerts.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Allocated CPU Limit
                    </label>
                    <span className="text-xs font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-primary">
                      {sliderValue[0]}%
                    </span>
                  </div>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    min={0}
                    max={100}
                  />
                </div>

                {/* RadioGroup */}
                <div className="space-y-2.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Storage Plan
                  </label>
                  <RadioGroup
                    defaultValue="standard"
                    className="grid grid-cols-3 gap-2"
                  >
                    <div className="flex items-center gap-2 border border-border rounded-lg p-2.5 justify-center cursor-pointer hover:bg-muted/30">
                      <RadioGroupItem value="standard" id="r-std" />
                      <label
                        htmlFor="r-std"
                        className="text-xs font-medium cursor-pointer"
                      >
                        5 GB
                      </label>
                    </div>
                    <div className="flex items-center gap-2 border border-border rounded-lg p-2.5 justify-center cursor-pointer hover:bg-muted/30">
                      <RadioGroupItem value="pro" id="r-pro" />
                      <label
                        htmlFor="r-pro"
                        className="text-xs font-medium cursor-pointer"
                      >
                        50 GB
                      </label>
                    </div>
                    <div className="flex items-center gap-2 border border-border rounded-lg p-2.5 justify-center cursor-pointer hover:bg-muted/30">
                      <RadioGroupItem value="enterprise" id="r-ent" />
                      <label
                        htmlFor="r-ent"
                        className="text-xs font-medium cursor-pointer"
                      >
                        500 GB
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Column 2: Lists & Unified Items */}
            <Card className="col-span-1 border border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Workspace Members
                </CardTitle>
                <CardDescription>
                  Demonstrating lists and content blocks utilizing Item
                  components.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ItemGroup>
                  <Item variant="muted" size="default">
                    <ItemMedia variant="image">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                        JD
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>John Doe</ItemTitle>
                      <ItemDescription>
                        Product Designer • j.doe@gravity.dev
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MailIcon className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send Email</TooltipContent>
                      </Tooltip>
                    </ItemActions>
                  </Item>

                  <Item
                    variant="default"
                    size="default"
                    className="border-b border-border/50 pb-3"
                  >
                    <ItemMedia variant="image">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center font-bold text-accent">
                        AM
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Alice Mercer</ItemTitle>
                      <ItemDescription>
                        Backend Engineer • a.mercer@gravity.dev
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <SettingsIcon className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Manage Settings</TooltipContent>
                      </Tooltip>
                    </ItemActions>
                  </Item>

                  <Item variant="default" size="default">
                    <ItemMedia variant="icon">
                      <div className="size-8 bg-blue-500/10 rounded flex items-center justify-center text-blue-500">
                        <ActivityIcon className="size-4" />
                      </div>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>System Analytics Feed</ItemTitle>
                      <ItemDescription>Refreshed 2 minutes ago</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <span className="text-xs text-green-500 font-medium">
                        Online
                      </span>
                    </ItemActions>
                  </Item>
                </ItemGroup>

                <ItemSeparator />

                <CardTitle className="text-sm font-semibold pt-1">
                  Recent Activity
                </CardTitle>
                <ItemGroup>
                  <Item size="xs" variant="default" className="py-1">
                    <ItemContent>
                      <ItemTitle className="text-xs font-normal">
                        <strong>Alice</strong> created a new Git branch{" "}
                        <code className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono">
                          feature/charts
                        </code>
                      </ItemTitle>
                      <ItemDescription className="text-[11px]">
                        Today at 4:32 PM
                      </ItemDescription>
                    </ItemContent>
                  </Item>

                  <Item size="xs" variant="default" className="py-1">
                    <ItemContent>
                      <ItemTitle className="text-xs font-normal">
                        <strong>John</strong> commented on dialog structure
                      </ItemTitle>
                      <ItemDescription className="text-[11px]">
                        Yesterday at 11:20 AM
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </ItemGroup>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="w-full justify-between p-0 h-auto font-medium text-xs"
                >
                  View audit history log
                  <ArrowRightIcon className="size-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Column 3: Interactive Overlays & popups */}
            <Card className="col-span-1 border border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Overlays & Dialogs
                </CardTitle>
                <CardDescription>
                  Triggers displaying contextual widgets and models.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dialog Trigger */}
                <div className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col items-center text-center gap-3">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <SparklesIcon className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Modal Dialog View</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Open fullscreen overlays containing actions.
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Open Workspace Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          Configure Workspace Preferences
                        </DialogTitle>
                        <DialogDescription>
                          Modify accessibility permissions, notification
                          templates, and system updates.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold">
                              Enable Analytics Tracking
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Share telemetry to optimize rendering speeds.
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold">
                              Automatic System Backups
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Store safe points to secure repository history.
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      <DialogFooter showCloseButton>
                        <Button
                          onClick={() => {
                            triggerToast("success");
                          }}
                        >
                          Save Configuration Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Popover & Tooltip Row */}
                <div className="grid grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary" className="w-full gap-2">
                        <HelpCircleIcon className="size-4 text-muted-foreground" />
                        Read Info
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 text-xs space-y-2">
                      <p className="font-semibold text-sm">
                        System Framework Details
                      </p>
                      <p className="text-muted-foreground leading-normal">
                        Popover overlays provide additional specifications
                        without disrupting active client navigation flows.
                      </p>
                    </PopoverContent>
                  </Popover>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="w-full gap-2">
                        <BellIcon className="size-4 text-muted-foreground animate-bounce" />
                        Notifications
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Preview active system notifications
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* ContextMenu Area */}
                <ContextMenu>
                  <ContextMenuTrigger asChild>
                    <div className="border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-context-menu hover:bg-muted/20 transition-colors">
                      <CodeIcon className="size-6 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">
                        Right-click this Card
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        To trigger the ContextMenu overlay.
                      </p>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-48">
                    <ContextMenuLabel>Developer Operations</ContextMenuLabel>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => triggerToast("success")}>
                      Format Files
                    </ContextMenuItem>
                    <ContextMenuItem>Refactor Imports</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuLabel>Build Priority</ContextMenuLabel>
                    <ContextMenuRadioGroup
                      value={contextRadio}
                      onValueChange={setContextRadio}
                    >
                      <ContextMenuRadioItem value="low">
                        Low Priority
                      </ContextMenuRadioItem>
                      <ContextMenuRadioItem value="medium">
                        Medium Priority
                      </ContextMenuRadioItem>
                      <ContextMenuRadioItem value="high">
                        High Priority
                      </ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row: Data Visualization (Chart) */}
          <section className="space-y-4">
            <Card className="border border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Analytical Insights
                  </CardTitle>
                  <CardDescription>
                    Visualizing visit volumes and purchase ratios over 6 months.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 bg-primary rounded-full"></span>
                  <span className="text-xs text-muted-foreground">Visits</span>
                  <span className="size-2 bg-accent rounded-full ml-2"></span>
                  <span className="text-xs text-muted-foreground">Sales</span>
                </div>
              </CardHeader>
              <CardContent className="h-64">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorVisits"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--primary)"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--primary)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorSales"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--accent)"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--accent)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        stroke="var(--muted-foreground)"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="visits"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVisits)"
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--accent)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSales)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Toaster element initialization */}
        <Toaster position="bottom-right" />
      </div>
    </TooltipProvider>
  );
}
