import React from "react"
import { Pressable, PressableProps, TextStyle, ViewStyle, StyleProp } from "react-native"
import { useTheme, Text } from "@rneui/themed"
import {
  GaloyIcon,
  IconNamesType,
  circleDiameterThatContainsSquare,
} from "../galoy-icon/galoy-icon"

export type GaloyIconButtonProps = {
  name: IconNamesType
  size: "medium" | "large"
  text?: string
  iconOnly?: boolean
}

const sizeMapping = {
  medium: 24,
  large: 32,
}

export const GaloyIconButton = ({
  size,
  name,
  text,
  iconOnly,
  disabled,
  ...remainingProps
}: GaloyIconButtonProps & PressableProps) => {
  const { theme } = useTheme()

  const iconContainerSize = circleDiameterThatContainsSquare(sizeMapping[size])

  const pressableStyle = (): StyleProp<ViewStyle> => {
    if (text) {
      return {
        alignItems: "center",
      }
    }

    return {
      width: iconContainerSize,
      height: iconContainerSize,
    }
  }

  const iconProps = (pressed, iconOnly, disabled) => {
    switch (true) {
      case iconOnly && disabled:
        return {
          opacity: 0.7,
          color: theme.colors.grey5,
          backgroundColor: "transparent",
        }
      case iconOnly && pressed:
        return {
          color: theme.colors.grey5,
          backgroundColor: theme.colors.grey10,
        }
      case iconOnly && !pressed:
        return {
          color: theme.colors.grey5,
          backgroundColor: "transparent",
        }
      case !iconOnly && disabled:
        return {
          backgroundColor: theme.colors.primary9,
          color: theme.colors.primary5,
          opacity: 0.7,
        }
      case !iconOnly && pressed:
        return {
          color: theme.colors.primary5,
          backgroundColor: theme.colors.primary8,
        }
      case !iconOnly && !pressed:
        return {
          color: theme.colors.primary5,
          backgroundColor: theme.colors.primary9,
        }
      default:
        return {}
    }
  }

  const fontStyle = (disabled): StyleProp<TextStyle> => {
    return {
      marginTop: 8,
      opacity: disabled ? 0.7 : 1,
    }
  }

  return (
    <Pressable
      hitSlop={text ? 0 : iconContainerSize / 2}
      style={pressableStyle}
      disabled={disabled}
      {...remainingProps}
    >
      {({ pressed }) => {
        return (
          <>
            <GaloyIcon
              name={name}
              size={sizeMapping[size]}
              {...iconProps(pressed, iconOnly, disabled)}
            />
            {text && (
              <Text type="p3" style={fontStyle(disabled)}>
                {text}
              </Text>
            )}
          </>
        )
      }}
    </Pressable>
  )
}

export const GaloyEditButton = ({ disabled, ...remainingProps }: PressableProps) => {
  const { theme } = useTheme()
  const pressableStyle = ({ pressed }): StyleProp<ViewStyle> => {
    return {
      width: 32,
      height: 32,
      borderRadius: 8,
      opacity: disabled ? 0.7 : 1,
      backgroundColor: pressed ? theme.colors.primary9 : theme.colors.primary10,
      alignItems: "center",
      justifyContent: "center",
    }
  }

  return (
    <Pressable
      {...remainingProps}
      hitSlop={16}
      style={pressableStyle}
      disabled={disabled}
    >
      {({ pressed }) => {
        return (
          <GaloyIcon
            name="pencil"
            size={20}
            color={theme.colors.primary5}
            opacity={pressed ? 0.7 : 1}
          />
        )
      }}
    </Pressable>
  )
}