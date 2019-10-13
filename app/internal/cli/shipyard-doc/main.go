package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/google/uuid"
)

func main() {
	fmt.Println("Booting...")

	ctx, cancel := context.WithCancel(context.Background())

	ticker := time.NewTicker(time.Duration(5) * time.Second)

	go func() {
		for {
			cmd := exec.CommandContext(ctx, "ls", "-laR", "./web/assets/")
			fmt.Println(cmd.Path, cmd.Args)

			if combinedOutput, err := cmd.CombinedOutput(); err != nil {
				fmt.Fprintln(os.Stderr, err)
			} else {
				io.Copy(os.Stdout, bytes.NewReader(combinedOutput))
			}

			<-ticker.C
			fmt.Println()
		}
	}()

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

	<-signals
	ticker.Stop()
	cancel()

	<-ctx.Done()
}
