export interface IncomingContainer {
    Id: string;
    Names?: (string)[] | null;
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    Ports: Port[];
    SizeRootFs: number;
    Labels: Labels;
    State: string;
    Status: string;
    HostConfig: HostConfig;
    NetworkSettings: NetworkSettings;
    Mounts?: (MountsEntity)[] | null;
  }
  export interface Port {
      IP: string;
      PrivatePort: number;
      PublicPort: number;
      Type: string;
  }
  export interface Labels {
  }
  export interface HostConfig {
    NetworkMode: string;
  }
  export interface NetworkSettings {
    Networks: Networks;
  }
  export interface Networks {
    bridge: Bridge;
  }
  export interface Bridge {
    IPAMConfig?: null;
    Links?: null;
    Aliases?: null;
    NetworkID: string;
    EndpointID: string;
    Gateway: string;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    MacAddress: string;
    DriverOpts?: null;
  }
  export interface MountsEntity {
    Type: string;
    Source: string;
    Destination: string;
    Mode: string;
    RW: boolean;
    Propagation: string;
  }
  