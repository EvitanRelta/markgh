type SpaceLength = number
type EmSpaces = number
type EnSpaces = number
type NbSpaces = number
type ThinSpaces = number
type HairSpaces = number

export type SpaceMultiples = [EmSpaces, EnSpaces, NbSpaces, ThinSpaces, HairSpaces]
export type Data = [SpaceLength, SpaceMultiples]

export const approxSpaceData: Data[] = [
    [0, [0, 0, 0, 0, 0]],
    [2, [0, 0, 0, 0, 1]],
    [3.203125, [0, 0, 0, 1, 0]],
    [4, [0, 0, 0, 0, 2]],
    [4.3828125, [0, 0, 1, 0, 0]],
    [5.203125, [0, 0, 0, 1, 1]],
    [6, [0, 0, 0, 0, 3]],
    [6.3828125, [0, 0, 1, 0, 1]],
    [6.40625, [0, 0, 0, 2, 0]],
    [7.203125, [0, 0, 0, 1, 2]],
    [7.5859375, [0, 0, 1, 1, 0]],
    [8, [0, 1, 0, 0, 0]],
    [8.3828125, [0, 0, 1, 0, 2]],
    [8.40625, [0, 0, 0, 2, 1]],
    [8.765625, [0, 0, 2, 0, 0]],
    [9.203125, [0, 0, 0, 1, 3]],
    [9.5859375, [0, 0, 1, 1, 1]],
    [9.609375, [0, 0, 0, 3, 0]],
    [10, [0, 1, 0, 0, 1]],
    [10.3828125, [0, 0, 1, 0, 3]],
    [10.40625, [0, 0, 0, 2, 2]],
    [10.765625, [0, 0, 2, 0, 1]],
    [10.7890625, [0, 0, 1, 2, 0]],
    [11.203125, [0, 1, 0, 1, 0]],
    [11.5859375, [0, 0, 1, 1, 2]],
    [11.609375, [0, 0, 0, 3, 1]],
    [11.96875, [0, 0, 2, 1, 0]],
    [12, [0, 1, 0, 0, 2]],
    [12.3828125, [0, 1, 1, 0, 0]],
    [12.40625, [0, 0, 0, 2, 3]],
    [12.765625, [0, 0, 2, 0, 2]],
    [12.7890625, [0, 0, 1, 2, 1]],
    [12.8125, [0, 0, 0, 4, 0]],
    [13.1484375, [0, 0, 3, 0, 0]],
    [13.203125, [0, 1, 0, 1, 1]],
    [13.5859375, [0, 0, 1, 1, 3]],
    [13.609375, [0, 0, 0, 3, 2]],
    [13.96875, [0, 0, 2, 1, 1]],
    [14, [0, 1, 0, 0, 3]],
    [14.3828125, [0, 1, 1, 0, 1]],
    [14.40625, [0, 1, 0, 2, 0]],
    [14.765625, [0, 0, 2, 0, 3]],
    [14.7890625, [0, 0, 1, 2, 2]],
    [14.8125, [0, 0, 0, 4, 1]],
    [15.1484375, [0, 0, 3, 0, 1]],
    [15.203125, [0, 1, 0, 1, 2]],
    [15.5859375, [0, 1, 1, 1, 0]],
    [15.609375, [0, 0, 0, 3, 3]],
    [15.96875, [0, 0, 2, 1, 2]],
    [16, [1, 0, 0, 0, 0]],
    [16.015625, [0, 0, 0, 5, 0]],
    [16.3515625, [0, 0, 3, 1, 0]],
    [16.3828125, [0, 1, 1, 0, 2]],
    [16.40625, [0, 1, 0, 2, 1]],
    [16.765625, [0, 1, 2, 0, 0]],
    [16.7890625, [0, 0, 1, 2, 3]],
    [16.8125, [0, 0, 0, 4, 2]],
    [17.1484375, [0, 0, 3, 0, 2]],
    [17.203125, [0, 1, 0, 1, 3]],
    [17.53125, [0, 0, 4, 0, 0]],
    [17.5859375, [0, 1, 1, 1, 1]],
    [17.609375, [0, 1, 0, 3, 0]],
    [17.96875, [0, 0, 2, 1, 3]],
    [18, [1, 0, 0, 0, 1]],
    [18.015625, [0, 0, 0, 5, 1]],
    [18.3515625, [0, 0, 3, 1, 1]],
    [18.3828125, [0, 1, 1, 0, 3]],
    [18.40625, [0, 1, 0, 2, 2]],
    [18.765625, [0, 1, 2, 0, 1]],
    [18.7890625, [0, 1, 1, 2, 0]],
    [18.8125, [0, 0, 0, 4, 3]],
    [19.1484375, [0, 0, 3, 0, 3]],
    [19.203125, [1, 0, 0, 1, 0]],
    [19.21875, [0, 0, 0, 6, 0]],
    [19.53125, [0, 0, 4, 0, 1]],
    [19.5859375, [0, 1, 1, 1, 2]],
    [19.609375, [0, 1, 0, 3, 1]],
    [19.96875, [0, 1, 2, 1, 0]],
    [20, [1, 0, 0, 0, 2]],
    [20.015625, [0, 0, 0, 5, 2]],
    [20.3515625, [0, 0, 3, 1, 2]],
    [20.3828125, [1, 0, 1, 0, 0]],
    [20.40625, [0, 1, 0, 2, 3]],
    [20.734375, [0, 0, 4, 1, 0]],
    [20.765625, [0, 1, 2, 0, 2]],
    [20.7890625, [0, 1, 1, 2, 1]],
    [20.8125, [0, 1, 0, 4, 0]],
    [21.1484375, [0, 1, 3, 0, 0]],
    [21.203125, [1, 0, 0, 1, 1]],
    [21.21875, [0, 0, 0, 6, 1]],
    [21.53125, [0, 0, 4, 0, 2]],
    [21.5859375, [0, 1, 1, 1, 3]],
    [21.609375, [0, 1, 0, 3, 2]],
    [21.9140625, [0, 0, 5, 0, 0]],
    [22, [1, 0, 0, 0, 3]],
    [22.015625, [0, 0, 0, 5, 3]],
    [22.3515625, [0, 0, 3, 1, 3]],
    [22.3828125, [1, 0, 1, 0, 1]],
    [22.40625, [1, 0, 0, 2, 0]],
    [22.421875, [0, 0, 0, 7, 0]],
    [22.734375, [0, 0, 4, 1, 1]],
    [22.765625, [0, 1, 2, 0, 3]],
    [22.7890625, [0, 1, 1, 2, 2]],
    [22.8125, [0, 1, 0, 4, 1]],
    [23.1484375, [0, 1, 3, 0, 1]],
    [23.203125, [1, 0, 0, 1, 2]],
    [23.21875, [0, 0, 0, 6, 2]],
    [23.53125, [0, 0, 4, 0, 3]],
    [23.5859375, [1, 0, 1, 1, 0]],
    [23.609375, [0, 1, 0, 3, 3]],
    [23.9140625, [0, 0, 5, 0, 1]],
    [24, [1, 1, 0, 0, 0]],
    [24.015625, [0, 1, 0, 5, 0]],
    [24.3515625, [0, 1, 3, 1, 0]],
    [24.3828125, [1, 0, 1, 0, 2]],
    [24.40625, [1, 0, 0, 2, 1]],
    [24.421875, [0, 0, 0, 7, 1]],
    [24.734375, [0, 0, 4, 1, 2]],
    [24.765625, [1, 0, 2, 0, 0]],
    [24.7890625, [0, 1, 1, 2, 3]],
    [24.8125, [0, 1, 0, 4, 2]],
    [25.1171875, [0, 0, 5, 1, 0]],
    [25.203125, [1, 0, 0, 1, 3]],
    [25.21875, [0, 0, 0, 6, 3]],
    [25.53125, [0, 1, 4, 0, 0]],
    [25.5859375, [1, 0, 1, 1, 1]],
    [25.609375, [1, 0, 0, 3, 0]],
    [25.625, [0, 0, 0, 8, 0]],
    [25.9140625, [0, 0, 5, 0, 2]],
    [26, [1, 1, 0, 0, 1]],
    [26.015625, [0, 1, 0, 5, 1]],
    [26.296875, [0, 0, 6, 0, 0]],
    [26.3828125, [1, 0, 1, 0, 3]],
    [26.40625, [1, 0, 0, 2, 2]],
    [26.421875, [0, 0, 0, 7, 2]],
    [26.734375, [0, 0, 4, 1, 3]],
    [26.765625, [1, 0, 2, 0, 1]],
    [26.7890625, [1, 0, 1, 2, 0]],
    [26.8125, [0, 1, 0, 4, 3]],
    [27.1171875, [0, 0, 5, 1, 1]],
    [27.203125, [1, 1, 0, 1, 0]],
    [27.21875, [0, 1, 0, 6, 0]],
    [27.53125, [0, 1, 4, 0, 1]],
    [27.5859375, [1, 0, 1, 1, 2]],
    [27.609375, [1, 0, 0, 3, 1]],
    [27.625, [0, 0, 0, 8, 1]],
    [27.9140625, [0, 0, 5, 0, 3]],
    [28, [1, 1, 0, 0, 2]],
    [28.015625, [0, 1, 0, 5, 2]],
    [28.296875, [0, 0, 6, 0, 1]],
    [28.3828125, [1, 1, 1, 0, 0]],
    [28.40625, [1, 0, 0, 2, 3]],
    [28.421875, [0, 0, 0, 7, 3]],
    [28.734375, [0, 1, 4, 1, 0]],
    [28.765625, [1, 0, 2, 0, 2]],
    [28.7890625, [1, 0, 1, 2, 1]],
    [28.8125, [1, 0, 0, 4, 0]],
    [28.828125, [0, 0, 0, 9, 0]],
    [29.1171875, [0, 0, 5, 1, 2]],
    [29.1484375, [1, 0, 3, 0, 0]],
    [29.203125, [1, 1, 0, 1, 1]],
    [29.21875, [0, 1, 0, 6, 1]],
    [29.5, [0, 0, 6, 1, 0]],
    [29.5859375, [1, 0, 1, 1, 3]],
    [29.609375, [1, 0, 0, 3, 2]],
    [29.625, [0, 0, 0, 8, 2]],
    [29.9140625, [0, 1, 5, 0, 0]],
    [30, [1, 1, 0, 0, 3]],
    [30.015625, [0, 1, 0, 5, 3]],
    [30.296875, [0, 0, 6, 0, 2]],
    [30.3828125, [1, 1, 1, 0, 1]],
    [30.40625, [1, 1, 0, 2, 0]],
    [30.421875, [0, 1, 0, 7, 0]],
    [30.6796875, [0, 0, 7, 0, 0]],
    [30.765625, [1, 0, 2, 0, 3]],
    [30.7890625, [1, 0, 1, 2, 2]],
    [30.8125, [1, 0, 0, 4, 1]],
    [30.828125, [0, 0, 0, 9, 1]],
    [31.1171875, [0, 0, 5, 1, 3]],
    [31.1484375, [1, 0, 3, 0, 1]],
    [31.203125, [1, 1, 0, 1, 2]],
    [31.21875, [0, 1, 0, 6, 2]],
    [31.5, [0, 0, 6, 1, 1]],
    [31.5859375, [1, 1, 1, 1, 0]],
    [31.609375, [1, 0, 0, 3, 3]],
    [31.625, [0, 0, 0, 8, 3]],
    [31.9140625, [0, 1, 5, 0, 1]],
    [32, [2, 0, 0, 0, 0]],
    [32.015625, [1, 0, 0, 5, 0]],
    [32.03125, [0, 0, 0, 10, 0]],
    [32.296875, [0, 0, 6, 0, 3]],
    [32.3828125, [1, 1, 1, 0, 2]],
    [32.40625, [1, 1, 0, 2, 1]],
    [32.421875, [0, 1, 0, 7, 1]],
    [32.6796875, [0, 0, 7, 0, 1]],
    [32.765625, [1, 1, 2, 0, 0]],
    [32.7890625, [1, 0, 1, 2, 3]],
    [32.8125, [1, 0, 0, 4, 2]],
    [32.828125, [0, 0, 0, 9, 2]],
    [33.1171875, [0, 1, 5, 1, 0]],
    [33.1484375, [1, 0, 3, 0, 2]],
    [33.203125, [1, 1, 0, 1, 3]],
    [33.21875, [0, 1, 0, 6, 3]],
    [33.5, [0, 0, 6, 1, 2]],
    [33.53125, [1, 0, 4, 0, 0]],
    [33.5859375, [1, 1, 1, 1, 1]],
    [33.609375, [1, 1, 0, 3, 0]],
    [33.625, [0, 1, 0, 8, 0]],
    [33.8828125, [0, 0, 7, 1, 0]],
    [33.96875, [1, 0, 2, 1, 3]],
    [34, [2, 0, 0, 0, 1]],
    [34.015625, [1, 0, 0, 5, 1]],
    [34.03125, [0, 0, 0, 10, 1]],
    [34.296875, [0, 1, 6, 0, 0]],
    [34.3828125, [1, 1, 1, 0, 3]],
    [34.40625, [1, 1, 0, 2, 2]],
    [34.421875, [0, 1, 0, 7, 2]],
    [34.6796875, [0, 0, 7, 0, 2]],
    [34.765625, [1, 1, 2, 0, 1]],
    [34.7890625, [1, 1, 1, 2, 0]],
    [34.8125, [1, 0, 0, 4, 3]],
    [34.828125, [0, 0, 0, 9, 3]],
    [35.0625, [0, 0, 8, 0, 0]],
    [35.1484375, [1, 0, 3, 0, 3]],
    [35.203125, [2, 0, 0, 1, 0]],
    [35.21875, [1, 0, 0, 6, 0]],
    [35.234375, [0, 0, 0, 11, 0]],
    [35.5, [0, 0, 6, 1, 3]],
    [35.53125, [1, 0, 4, 0, 1]],
    [35.5859375, [1, 1, 1, 1, 2]],
    [35.609375, [1, 1, 0, 3, 1]],
    [35.625, [0, 1, 0, 8, 1]],
    [35.8828125, [0, 0, 7, 1, 1]],
    [35.96875, [1, 1, 2, 1, 0]],
    [36, [2, 0, 0, 0, 2]],
    [36.015625, [1, 0, 0, 5, 2]],
    [36.03125, [0, 0, 0, 10, 2]],
    [36.296875, [0, 1, 6, 0, 1]],
    [36.3828125, [2, 0, 1, 0, 0]],
    [36.40625, [1, 1, 0, 2, 3]],
    [36.421875, [0, 1, 0, 7, 3]],
    [36.6796875, [0, 0, 7, 0, 3]],
    [36.765625, [1, 1, 2, 0, 2]],
    [36.7890625, [1, 1, 1, 2, 1]],
    [36.8125, [1, 1, 0, 4, 0]],
    [36.828125, [0, 1, 0, 9, 0]],
    [37.0625, [0, 0, 8, 0, 1]],
    [37.1484375, [1, 1, 3, 0, 0]],
    [37.203125, [2, 0, 0, 1, 1]],
    [37.21875, [1, 0, 0, 6, 1]],
    [37.234375, [0, 0, 0, 11, 1]],
    [37.5, [0, 1, 6, 1, 0]],
    [37.53125, [1, 0, 4, 0, 2]],
    [37.5859375, [1, 1, 1, 1, 3]],
    [37.609375, [1, 1, 0, 3, 2]],
    [37.625, [0, 1, 0, 8, 2]],
    [37.8828125, [0, 0, 7, 1, 2]],
    [37.9140625, [1, 0, 5, 0, 0]],
    [38, [2, 0, 0, 0, 3]],
    [38.015625, [1, 0, 0, 5, 3]],
    [38.03125, [0, 0, 0, 10, 3]],
    [38.265625, [0, 0, 8, 1, 0]],
    [38.3515625, [1, 0, 3, 1, 3]],
    [38.3828125, [2, 0, 1, 0, 1]],
    [38.40625, [2, 0, 0, 2, 0]],
    [38.421875, [1, 0, 0, 7, 0]],
    [38.4375, [0, 0, 0, 12, 0]],
    [38.6796875, [0, 1, 7, 0, 0]],
    [38.765625, [1, 1, 2, 0, 3]],
    [38.7890625, [1, 1, 1, 2, 2]],
    [38.8125, [1, 1, 0, 4, 1]],
    [38.828125, [0, 1, 0, 9, 1]],
    [39.0625, [0, 0, 8, 0, 2]],
    [39.1484375, [1, 1, 3, 0, 1]],
    [39.203125, [2, 0, 0, 1, 2]],
    [39.21875, [1, 0, 0, 6, 2]],
    [39.234375, [0, 0, 0, 11, 2]],
    [39.4453125, [0, 0, 9, 0, 0]],
    [39.53125, [1, 0, 4, 0, 3]],
    [39.5859375, [2, 0, 1, 1, 0]],
    [39.609375, [1, 1, 0, 3, 3]],
    [39.625, [0, 1, 0, 8, 3]],
    [39.8828125, [0, 0, 7, 1, 3]],
    [39.9140625, [1, 0, 5, 0, 1]],
    [40, [2, 1, 0, 0, 0]],
    [40.015625, [1, 1, 0, 5, 0]],
    [40.03125, [0, 1, 0, 10, 0]],
    [40.265625, [0, 0, 8, 1, 1]],
    [40.3515625, [1, 1, 3, 1, 0]],
    [40.3828125, [2, 0, 1, 0, 2]],
    [40.40625, [2, 0, 0, 2, 1]],
    [40.421875, [1, 0, 0, 7, 1]],
    [40.4375, [0, 0, 0, 12, 1]],
    [40.6796875, [0, 1, 7, 0, 1]],
    [40.765625, [2, 0, 2, 0, 0]],
    [40.7890625, [1, 1, 1, 2, 3]],
    [40.8125, [1, 1, 0, 4, 2]],
    [40.828125, [0, 1, 0, 9, 2]],
    [41.0625, [0, 0, 8, 0, 3]],
    [41.1484375, [1, 1, 3, 0, 2]],
    [41.203125, [2, 0, 0, 1, 3]],
    [41.21875, [1, 0, 0, 6, 3]],
    [41.234375, [0, 0, 0, 11, 3]],
    [41.4453125, [0, 0, 9, 0, 1]],
    [41.53125, [1, 1, 4, 0, 0]],
    [41.5859375, [2, 0, 1, 1, 1]],
    [41.609375, [2, 0, 0, 3, 0]],
    [41.625, [1, 0, 0, 8, 0]],
    [41.640625, [0, 0, 0, 13, 0]],
    [41.8828125, [0, 1, 7, 1, 0]],
    [41.9140625, [1, 0, 5, 0, 2]],
    [42, [2, 1, 0, 0, 1]],
    [42.015625, [1, 1, 0, 5, 1]],
    [42.03125, [0, 1, 0, 10, 1]],
    [42.265625, [0, 0, 8, 1, 2]],
    [42.296875, [1, 0, 6, 0, 0]],
    [42.3828125, [2, 0, 1, 0, 3]],
    [42.40625, [2, 0, 0, 2, 2]],
    [42.421875, [1, 0, 0, 7, 2]],
    [42.4375, [0, 0, 0, 12, 2]],
    [42.6484375, [0, 0, 9, 1, 0]],
    [42.734375, [1, 0, 4, 1, 3]],
    [42.765625, [2, 0, 2, 0, 1]],
    [42.7890625, [2, 0, 1, 2, 0]],
    [42.8125, [1, 1, 0, 4, 3]],
    [42.828125, [0, 1, 0, 9, 3]],
    [43.0625, [0, 1, 8, 0, 0]],
    [43.1484375, [1, 1, 3, 0, 3]],
    [43.203125, [2, 1, 0, 1, 0]],
    [43.21875, [1, 1, 0, 6, 0]],
    [43.234375, [0, 1, 0, 11, 0]],
    [43.4453125, [0, 0, 9, 0, 2]],
    [43.53125, [1, 1, 4, 0, 1]],
    [43.5859375, [2, 0, 1, 1, 2]],
    [43.609375, [2, 0, 0, 3, 1]],
    [43.625, [1, 0, 0, 8, 1]],
    [43.640625, [0, 0, 0, 13, 1]],
    [43.828125, [0, 0, 10, 0, 0]],
    [43.9140625, [1, 0, 5, 0, 3]],
    [44, [2, 1, 0, 0, 2]],
    [44.015625, [1, 1, 0, 5, 2]],
    [44.03125, [0, 1, 0, 10, 2]],
    [44.265625, [0, 0, 8, 1, 3]],
    [44.296875, [1, 0, 6, 0, 1]],
    [44.3828125, [2, 1, 1, 0, 0]],
    [44.40625, [2, 0, 0, 2, 3]],
    [44.421875, [1, 0, 0, 7, 3]],
    [44.4375, [0, 0, 0, 12, 3]],
    [44.6484375, [0, 0, 9, 1, 1]],
    [44.734375, [1, 1, 4, 1, 0]],
    [44.765625, [2, 0, 2, 0, 2]],
    [44.7890625, [2, 0, 1, 2, 1]],
    [44.8125, [2, 0, 0, 4, 0]],
    [44.828125, [1, 0, 0, 9, 0]],
    [44.84375, [0, 0, 0, 14, 0]],
    [45.0625, [0, 1, 8, 0, 1]],
    [45.1484375, [2, 0, 3, 0, 0]],
    [45.203125, [2, 1, 0, 1, 1]],
    [45.21875, [1, 1, 0, 6, 1]],
    [45.234375, [0, 1, 0, 11, 1]],
    [45.4453125, [0, 0, 9, 0, 3]],
    [45.53125, [1, 1, 4, 0, 2]],
    [45.5859375, [2, 0, 1, 1, 3]],
    [45.609375, [2, 0, 0, 3, 2]],
    [45.625, [1, 0, 0, 8, 2]],
    [45.640625, [0, 0, 0, 13, 2]],
    [45.828125, [0, 0, 10, 0, 1]],
    [45.9140625, [1, 1, 5, 0, 0]],
    [46, [2, 1, 0, 0, 3]],
    [46.015625, [1, 1, 0, 5, 3]],
    [46.03125, [0, 1, 0, 10, 3]],
    [46.265625, [0, 1, 8, 1, 0]],
    [46.296875, [1, 0, 6, 0, 2]],
    [46.3828125, [2, 1, 1, 0, 1]],
    [46.40625, [2, 1, 0, 2, 0]],
    [46.421875, [1, 1, 0, 7, 0]],
    [46.4375, [0, 1, 0, 12, 0]],
    [46.6484375, [0, 0, 9, 1, 2]],
    [46.6796875, [1, 0, 7, 0, 0]],
    [46.765625, [2, 0, 2, 0, 3]],
    [46.7890625, [2, 0, 1, 2, 2]],
    [46.8125, [2, 0, 0, 4, 1]],
    [46.828125, [1, 0, 0, 9, 1]],
    [46.84375, [0, 0, 0, 14, 1]],
    [47.03125, [0, 0, 10, 1, 0]],
    [47.1171875, [1, 0, 5, 1, 3]],
    [47.1484375, [2, 0, 3, 0, 1]],
    [47.203125, [2, 1, 0, 1, 2]],
    [47.21875, [1, 1, 0, 6, 2]],
    [47.234375, [0, 1, 0, 11, 2]],
    [47.4453125, [0, 1, 9, 0, 0]],
    [47.53125, [1, 1, 4, 0, 3]],
    [47.5859375, [2, 1, 1, 1, 0]],
    [47.609375, [2, 0, 0, 3, 3]],
    [47.625, [1, 0, 0, 8, 3]],
    [47.640625, [0, 0, 0, 13, 3]],
    [47.828125, [0, 0, 10, 0, 2]],
    [47.9140625, [1, 1, 5, 0, 1]],
    [48, [3, 0, 0, 0, 0]],
    [48.015625, [2, 0, 0, 5, 0]],
    [48.03125, [1, 0, 0, 10, 0]],
    [48.046875, [0, 0, 0, 15, 0]],
    [48.2109375, [0, 0, 11, 0, 0]],
    [48.296875, [1, 0, 6, 0, 3]],
    [48.3828125, [2, 1, 1, 0, 2]],
    [48.40625, [2, 1, 0, 2, 1]],
    [48.421875, [1, 1, 0, 7, 1]],
    [48.4375, [0, 1, 0, 12, 1]],
    [48.6484375, [0, 0, 9, 1, 3]],
    [48.6796875, [1, 0, 7, 0, 1]],
    [48.765625, [2, 1, 2, 0, 0]],
    [48.7890625, [2, 0, 1, 2, 3]],
    [48.8125, [2, 0, 0, 4, 2]],
    [48.828125, [1, 0, 0, 9, 2]],
    [48.84375, [0, 0, 0, 14, 2]],
    [49.03125, [0, 0, 10, 1, 1]],
    [49.1171875, [1, 1, 5, 1, 0]],
    [49.1484375, [2, 0, 3, 0, 2]],
    [49.203125, [2, 1, 0, 1, 3]],
    [49.21875, [1, 1, 0, 6, 3]],
    [49.234375, [0, 1, 0, 11, 3]],
    [49.4453125, [0, 1, 9, 0, 1]],
    [49.53125, [2, 0, 4, 0, 0]],
    [49.5859375, [2, 1, 1, 1, 1]],
    [49.609375, [2, 1, 0, 3, 0]],
    [49.625, [1, 1, 0, 8, 0]],
    [49.640625, [0, 1, 0, 13, 0]],
    [49.828125, [0, 0, 10, 0, 3]],
    [49.9140625, [1, 1, 5, 0, 2]],
    [50, [3, 0, 0, 0, 1]],
    [50.015625, [2, 0, 0, 5, 1]],
    [50.03125, [1, 0, 0, 10, 1]],
    [50.046875, [0, 0, 0, 15, 1]],
    [50.2109375, [0, 0, 11, 0, 1]],
    [50.296875, [1, 1, 6, 0, 0]],
    [50.3828125, [2, 1, 1, 0, 3]],
    [50.40625, [2, 1, 0, 2, 2]],
    [50.421875, [1, 1, 0, 7, 2]],
    [50.4375, [0, 1, 0, 12, 2]],
    [50.6484375, [0, 1, 9, 1, 0]],
    [50.6796875, [1, 0, 7, 0, 2]],
    [50.765625, [2, 1, 2, 0, 1]],
    [50.7890625, [2, 1, 1, 2, 0]],
    [50.8125, [2, 0, 0, 4, 3]],
    [50.828125, [1, 0, 0, 9, 3]],
    [50.84375, [0, 0, 0, 14, 3]],
    [51.03125, [0, 0, 10, 1, 2]],
    [51.0625, [1, 0, 8, 0, 0]],
    [51.1484375, [2, 0, 3, 0, 3]],
    [51.203125, [3, 0, 0, 1, 0]],
    [51.21875, [2, 0, 0, 6, 0]],
    [51.234375, [1, 0, 0, 11, 0]],
    [51.25, [0, 0, 0, 16, 0]],
    [51.4140625, [0, 0, 11, 1, 0]],
    [51.5, [1, 0, 6, 1, 3]],
    [51.53125, [2, 0, 4, 0, 1]],
    [51.5859375, [2, 1, 1, 1, 2]],
    [51.609375, [2, 1, 0, 3, 1]],
    [51.625, [1, 1, 0, 8, 1]],
    [51.640625, [0, 1, 0, 13, 1]],
    [51.828125, [0, 1, 10, 0, 0]],
    [51.9140625, [1, 1, 5, 0, 3]],
    [52, [3, 0, 0, 0, 2]],
    [52.015625, [2, 0, 0, 5, 2]],
    [52.03125, [1, 0, 0, 10, 2]],
    [52.046875, [0, 0, 0, 15, 2]],
    [52.2109375, [0, 0, 11, 0, 2]],
    [52.296875, [1, 1, 6, 0, 1]],
    [52.3828125, [3, 0, 1, 0, 0]],
    [52.40625, [2, 1, 0, 2, 3]],
    [52.421875, [1, 1, 0, 7, 3]],
    [52.4375, [0, 1, 0, 12, 3]],
    [52.59375, [0, 0, 12, 0, 0]],
    [52.6796875, [1, 0, 7, 0, 3]],
    [52.765625, [2, 1, 2, 0, 2]],
    [52.7890625, [2, 1, 1, 2, 1]],
    [52.8125, [2, 1, 0, 4, 0]],
    [52.828125, [1, 1, 0, 9, 0]],
    [52.84375, [0, 1, 0, 14, 0]],
    [53.03125, [0, 0, 10, 1, 3]],
    [53.0625, [1, 0, 8, 0, 1]],
    [53.1484375, [2, 1, 3, 0, 0]],
    [53.203125, [3, 0, 0, 1, 1]],
    [53.21875, [2, 0, 0, 6, 1]],
    [53.234375, [1, 0, 0, 11, 1]],
    [53.25, [0, 0, 0, 16, 1]],
    [53.4140625, [0, 0, 11, 1, 1]],
    [53.5, [1, 1, 6, 1, 0]],
    [53.53125, [2, 0, 4, 0, 2]],
    [53.5859375, [2, 1, 1, 1, 3]],
    [53.609375, [2, 1, 0, 3, 2]],
    [53.625, [1, 1, 0, 8, 2]],
    [53.640625, [0, 1, 0, 13, 2]],
    [53.828125, [0, 1, 10, 0, 1]],
    [53.9140625, [2, 0, 5, 0, 0]],
    [54, [3, 0, 0, 0, 3]],
    [54.015625, [2, 0, 0, 5, 3]],
    [54.03125, [1, 0, 0, 10, 3]],
    [54.046875, [0, 0, 0, 15, 3]],
    [54.2109375, [0, 0, 11, 0, 3]],
    [54.296875, [1, 1, 6, 0, 2]],
    [54.3828125, [3, 0, 1, 0, 1]],
    [54.40625, [3, 0, 0, 2, 0]],
    [54.421875, [2, 0, 0, 7, 0]],
    [54.4375, [1, 0, 0, 12, 0]],
    [54.453125, [0, 0, 0, 17, 0]],
    [54.59375, [0, 0, 12, 0, 1]],
    [54.6796875, [1, 1, 7, 0, 0]],
    [54.765625, [2, 1, 2, 0, 3]],
    [54.7890625, [2, 1, 1, 2, 2]],
    [54.8125, [2, 1, 0, 4, 1]],
    [54.828125, [1, 1, 0, 9, 1]],
    [54.84375, [0, 1, 0, 14, 1]],
    [55.03125, [0, 1, 10, 1, 0]],
    [55.0625, [1, 0, 8, 0, 2]],
    [55.1484375, [2, 1, 3, 0, 1]],
    [55.203125, [3, 0, 0, 1, 2]],
    [55.21875, [2, 0, 0, 6, 2]],
    [55.234375, [1, 0, 0, 11, 2]],
    [55.25, [0, 0, 0, 16, 2]],
    [55.4140625, [0, 0, 11, 1, 2]],
    [55.4453125, [1, 0, 9, 0, 0]],
    [55.53125, [2, 0, 4, 0, 3]],
    [55.5859375, [3, 0, 1, 1, 0]],
    [55.609375, [2, 1, 0, 3, 3]],
    [55.625, [1, 1, 0, 8, 3]],
    [55.640625, [0, 1, 0, 13, 3]],
    [55.796875, [0, 0, 12, 1, 0]],
    [55.8828125, [1, 0, 7, 1, 3]],
    [55.9140625, [2, 0, 5, 0, 1]],
    [56, [3, 1, 0, 0, 0]],
    [56.015625, [2, 1, 0, 5, 0]],
    [56.03125, [1, 1, 0, 10, 0]],
    [56.046875, [0, 1, 0, 15, 0]],
    [56.2109375, [0, 1, 11, 0, 0]],
    [56.296875, [1, 1, 6, 0, 3]],
    [56.3828125, [3, 0, 1, 0, 2]],
    [56.40625, [3, 0, 0, 2, 1]],
    [56.421875, [2, 0, 0, 7, 1]],
    [56.4375, [1, 0, 0, 12, 1]],
    [56.453125, [0, 0, 0, 17, 1]],
    [56.59375, [0, 0, 12, 0, 2]],
    [56.6796875, [1, 1, 7, 0, 1]],
    [56.765625, [3, 0, 2, 0, 0]],
    [56.7890625, [2, 1, 1, 2, 3]],
    [56.8125, [2, 1, 0, 4, 2]],
    [56.828125, [1, 1, 0, 9, 2]],
    [56.84375, [0, 1, 0, 14, 2]],
    [56.9765625, [0, 0, 13, 0, 0]],
    [57.0625, [1, 0, 8, 0, 3]],
    [57.1484375, [2, 1, 3, 0, 2]],
    [57.203125, [3, 0, 0, 1, 3]],
    [57.21875, [2, 0, 0, 6, 3]],
    [57.234375, [1, 0, 0, 11, 3]],
    [57.25, [0, 0, 0, 16, 3]],
    [57.4140625, [0, 0, 11, 1, 3]],
    [57.4453125, [1, 0, 9, 0, 1]],
    [57.53125, [2, 1, 4, 0, 0]],
    [57.5859375, [3, 0, 1, 1, 1]],
    [57.609375, [3, 0, 0, 3, 0]],
    [57.625, [2, 0, 0, 8, 0]],
    [57.640625, [1, 0, 0, 13, 0]],
    [57.65625, [0, 0, 0, 18, 0]],
    [57.796875, [0, 0, 12, 1, 1]],
    [57.8828125, [1, 1, 7, 1, 0]],
    [57.9140625, [2, 0, 5, 0, 2]],
    [58, [3, 1, 0, 0, 1]],
    [58.015625, [2, 1, 0, 5, 1]],
    [58.03125, [1, 1, 0, 10, 1]],
    [58.046875, [0, 1, 0, 15, 1]],
    [58.2109375, [0, 1, 11, 0, 1]],
    [58.296875, [2, 0, 6, 0, 0]],
    [58.3828125, [3, 0, 1, 0, 3]],
    [58.40625, [3, 0, 0, 2, 2]],
    [58.421875, [2, 0, 0, 7, 2]],
    [58.4375, [1, 0, 0, 12, 2]],
    [58.453125, [0, 0, 0, 17, 2]],
    [58.59375, [0, 0, 12, 0, 3]],
    [58.6796875, [1, 1, 7, 0, 2]],
    [58.765625, [3, 0, 2, 0, 1]],
    [58.7890625, [3, 0, 1, 2, 0]],
    [58.8125, [2, 1, 0, 4, 3]],
    [58.828125, [1, 1, 0, 9, 3]],
    [58.84375, [0, 1, 0, 14, 3]],
    [58.9765625, [0, 0, 13, 0, 1]],
    [59.0625, [1, 1, 8, 0, 0]],
    [59.1484375, [2, 1, 3, 0, 3]],
    [59.203125, [3, 1, 0, 1, 0]],
    [59.21875, [2, 1, 0, 6, 0]],
    [59.234375, [1, 1, 0, 11, 0]],
    [59.25, [0, 1, 0, 16, 0]],
    [59.4140625, [0, 1, 11, 1, 0]],
    [59.4453125, [1, 0, 9, 0, 2]],
    [59.53125, [2, 1, 4, 0, 1]],
    [59.5859375, [3, 0, 1, 1, 2]],
    [59.609375, [3, 0, 0, 3, 1]],
    [59.625, [2, 0, 0, 8, 1]],
    [59.640625, [1, 0, 0, 13, 1]],
    [59.65625, [0, 0, 0, 18, 1]],
    [59.796875, [0, 0, 12, 1, 2]],
    [59.828125, [1, 0, 10, 0, 0]],
    [59.9140625, [2, 0, 5, 0, 3]],
    [60, [3, 1, 0, 0, 2]],
    [60.015625, [2, 1, 0, 5, 2]],
    [60.03125, [1, 1, 0, 10, 2]],
    [60.046875, [0, 1, 0, 15, 2]],
    [60.1796875, [0, 0, 13, 1, 0]],
    [60.265625, [1, 0, 8, 1, 3]],
    [60.296875, [2, 0, 6, 0, 1]],
    [60.3828125, [3, 1, 1, 0, 0]],
    [60.40625, [3, 0, 0, 2, 3]],
    [60.421875, [2, 0, 0, 7, 3]],
    [60.4375, [1, 0, 0, 12, 3]],
    [60.453125, [0, 0, 0, 17, 3]],
    [60.59375, [0, 1, 12, 0, 0]],
    [60.6796875, [1, 1, 7, 0, 3]],
    [60.765625, [3, 0, 2, 0, 2]],
    [60.7890625, [3, 0, 1, 2, 1]],
    [60.8125, [3, 0, 0, 4, 0]],
    [60.828125, [2, 0, 0, 9, 0]],
    [60.84375, [1, 0, 0, 14, 0]],
    [60.859375, [0, 0, 0, 19, 0]],
    [60.9765625, [0, 0, 13, 0, 2]],
    [61.0625, [1, 1, 8, 0, 1]],
    [61.1484375, [3, 0, 3, 0, 0]],
    [61.203125, [3, 1, 0, 1, 1]],
    [61.21875, [2, 1, 0, 6, 1]],
    [61.234375, [1, 1, 0, 11, 1]],
    [61.25, [0, 1, 0, 16, 1]],
    [61.359375, [0, 0, 14, 0, 0]],
    [61.4453125, [1, 0, 9, 0, 3]],
    [61.53125, [2, 1, 4, 0, 2]],
    [61.5859375, [3, 0, 1, 1, 3]],
    [61.609375, [3, 0, 0, 3, 2]],
    [61.625, [2, 0, 0, 8, 2]],
    [61.640625, [1, 0, 0, 13, 2]],
    [61.65625, [0, 0, 0, 18, 2]],
    [61.796875, [0, 0, 12, 1, 3]],
    [61.828125, [1, 0, 10, 0, 1]],
    [61.9140625, [2, 1, 5, 0, 0]],
    [62, [3, 1, 0, 0, 3]],
    [62.015625, [2, 1, 0, 5, 3]],
    [62.03125, [1, 1, 0, 10, 3]],
    [62.046875, [0, 1, 0, 15, 3]],
    [62.1796875, [0, 0, 13, 1, 1]],
    [62.265625, [1, 1, 8, 1, 0]],
    [62.296875, [2, 0, 6, 0, 2]],
    [62.3828125, [3, 1, 1, 0, 1]],
    [62.40625, [3, 1, 0, 2, 0]],
    [62.421875, [2, 1, 0, 7, 0]],
    [62.4375, [1, 1, 0, 12, 0]],
    [62.453125, [0, 1, 0, 17, 0]],
    [62.59375, [0, 1, 12, 0, 1]],
    [62.6796875, [2, 0, 7, 0, 0]],
    [62.765625, [3, 0, 2, 0, 3]],
    [62.7890625, [3, 0, 1, 2, 2]],
    [62.8125, [3, 0, 0, 4, 1]],
    [62.828125, [2, 0, 0, 9, 1]],
    [62.84375, [1, 0, 0, 14, 1]],
    [62.859375, [0, 0, 0, 19, 1]],
    [62.9765625, [0, 0, 13, 0, 3]],
    [63.0625, [1, 1, 8, 0, 2]],
    [63.1484375, [3, 0, 3, 0, 1]],
    [63.203125, [3, 1, 0, 1, 2]],
    [63.21875, [2, 1, 0, 6, 2]],
    [63.234375, [1, 1, 0, 11, 2]],
    [63.25, [0, 1, 0, 16, 2]],
    [63.359375, [0, 0, 14, 0, 1]],
    [63.4453125, [1, 1, 9, 0, 0]],
    [63.53125, [2, 1, 4, 0, 3]],
    [63.5859375, [3, 1, 1, 1, 0]],
    [63.609375, [3, 0, 0, 3, 3]],
    [63.625, [2, 0, 0, 8, 3]],
    [63.640625, [1, 0, 0, 13, 3]],
    [63.65625, [0, 0, 0, 18, 3]],
    [63.796875, [0, 1, 12, 1, 0]],
    [63.828125, [1, 0, 10, 0, 2]],
    [63.9140625, [2, 1, 5, 0, 1]],
    [64, [4, 0, 0, 0, 0]],
]
